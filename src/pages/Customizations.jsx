import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { WHATSAPP_NUMBER } from '../config';

const FLAVORS = [
  { id: 'pineapple', label: 'Pineapple', desc: 'Classic pineapple flavor' },
  { id: 'blackforest', label: 'Black Forest', desc: 'Rich chocolate and cherries' },
  { id: 'whiteforest', label: 'White Forest', desc: 'White chocolate and cherries' },
  { id: 'mango', label: 'Mango', desc: 'Fresh tropical mango' },
  { id: 'strawberry', label: 'Strawberry', desc: 'Sweet fresh strawberries' },
  { id: 'caramelbutterscotch', label: 'Caramel Butterscotch', desc: 'Golden caramel crunch' },
  { 
    id: 'redvelvet', 
    label: 'Red Velvet *', 
    desc: 'Classic red velvet (*Egg only - no eggless option)',
    hasAsterisk: true,
    badge: '* Egg Only'
  },
  { id: 'vanilla', label: 'Vanilla', desc: 'Classic vanilla' },
  { id: 'vancho', label: 'Vancho', desc: 'Vanilla and chocolate blend' },
  { id: 'blueberry', label: 'Blueberry', desc: 'Sweet wild blueberries' },
  { id: 'oreochocolate', label: 'Oreo Chocolate', desc: 'Crushed Oreos in chocolate' },
  { id: 'irishcoffee', label: 'Irish Coffee', desc: 'Rich coffee flavor' },
  { id: 'chocostrawberry', label: 'Choco Strawberry', desc: 'Chocolate with strawberries' },
  { id: 'chocolatetruffle', label: 'Chocolate Truffle', desc: 'Dense chocolate ganache' },
  { id: 'freshmango', label: 'Fresh Mango', desc: 'Made with real mango pieces' },
  { id: 'belgiumtruffle', label: 'Belgium Truffle', desc: 'Premium Belgian chocolate' },
  { id: 'rasmalai', label: 'Rasmalai', desc: 'Indian fusion delight' },
  { id: 'biscoff', label: 'Biscoff', desc: 'Lotus Biscoff cookie flavor' },
  { id: 'chocohazelnut', label: 'Choco Hazelnut', desc: 'Chocolate and roasted hazelnuts' },
  { id: 'russianhoney', label: 'Russian Honey', desc: 'Layers of honey and cream' }
];

const DIETARY_OPTIONS = [
  { 
    id: 'egg', 
    label: 'With Egg', 
    desc: 'Traditional recipe with rich, moist & airy sponge',
    badge: 'Classic Recipe'
  },
  { 
    id: 'eggless', 
    label: '100% Eggless', 
    desc: 'Pure vegetarian sponge crafted to perfection',
    badge: 'Pure Veg'
  }
];

const FROSTINGS = [
  { id: 'buttercream', label: 'Buttercream', desc: 'Classic smooth & silky' },
  { id: 'whipped', label: 'Whipped Cream', desc: 'Light as clouds, naturally sweet' }
];

const SIZES = [
  { id: 'medium', label: '1 kg', desc: 'Ideal for 6–8 people' },
  { id: 'pair', label: '1.5 kg', desc: 'Great for 10–12 people' },
  { id: 'large', label: '2 kg', desc: 'Perfect for 14–16 people' },
  { id: 'tiered', label: '3-Tier', desc: 'Grand centerpiece for 25+ guests' }
];

const steps = [
  { key: 'flavor', title: 'Choose Your Flavor', subtitle: 'Select your preferred cake sponge flavor', options: FLAVORS },
  { key: 'dietary', title: 'Egg or Eggless Preference', subtitle: 'Select your dietary preparation', options: DIETARY_OPTIONS },
  { key: 'frosting', title: 'Pick Your Frosting', subtitle: 'Select your preferred frosting style', options: FROSTINGS },
  { key: 'size', title: 'Select Your Size', subtitle: 'Choose the ideal size for your celebration', options: SIZES },
  { key: 'photo', title: 'Custom Cake Photo', subtitle: 'Upload your photo for custom cake design or photo print' }
];

const Customizations = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    dietary: DIETARY_OPTIONS[0] // default to 'With Egg'
  });
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  // Photo upload states
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const isRedVelvetSelected = selections.flavor?.id === 'redvelvet';

  const select = (stepKey, option) => {
    // Handling Red Velvet restrictions
    if (stepKey === 'flavor') {
      if (option.id === 'redvelvet' && selections.dietary?.id === 'eggless') {
        toast('* Red Velvet is only available with egg. Preference set to "With Egg".', {
          duration: 4000
        });
        setSelections(prev => ({
          ...prev,
          flavor: option,
          dietary: DIETARY_OPTIONS.find(d => d.id === 'egg')
        }));
        return;
      }
    }

    if (stepKey === 'dietary' && isRedVelvetSelected && option.id === 'eggless') {
      toast.error('* Red Velvet contains egg only. Eggless is not available for this flavor.');
      return;
    }

    setSelections(prev => ({ ...prev, [stepKey]: option }));
  };

  const uploadPhotoToServer = async (file) => {
    setUploadingPhoto(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Failed to upload image to file host');
      const data = await res.json();

      if (data?.data?.url) {
        // Convert tmpfiles view URL into direct download/view URL
        const directUrl = data.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');
        setPhotoUrl(directUrl);
        toast.success('Photo uploaded! Direct link will be attached to WhatsApp.', { duration: 3500 });
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      console.warn('Photo direct upload warning:', err);
      setUploadError('Note: Image saved locally. Please also send the photo file in the WhatsApp chat!');
      toast('Photo selected! It will be sent via WhatsApp.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Image size is too large. Please select an image under 15MB.');
      return;
    }

    setPhotoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    // Upload to server for direct WhatsApp link
    uploadPhotoToServer(file);
  };

  const clearPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoUrl(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyImageToClipboard = async () => {
    if (!photoFile) return;
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({ [photoFile.type]: photoFile });
        await navigator.clipboard.write([item]);
        toast.success('Photo copied to clipboard! You can press Ctrl+V in WhatsApp Web.');
      } else {
        toast('Clipboard direct image copying not supported on this browser.');
      }
    } catch {
      toast('Photo link is ready in WhatsApp message.');
    }
  };

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const currentStepDef = steps[currentStep];
  const allRequiredSelected = Boolean(selections.flavor && selections.dietary && selections.frosting && selections.size);

  const handleOrder = () => {
    if (!allRequiredSelected) {
      toast.error('Please complete all cake customization steps before ordering.');
      return;
    }

    const flavorText = selections.flavor ? (isRedVelvetSelected ? 'Red Velvet * (Contains Egg Only)' : selections.flavor.label) : 'Not selected';
    const dietaryText = selections.dietary?.label || 'Not selected';
    const frostingText = selections.frosting?.label || 'Not selected';
    const sizeText = selections.size?.label || 'Not selected';

    let photoSection = 'No photo uploaded';
    if (photoFile) {
      photoSection = `Custom Photo for Cake:\n`;
      if (photoUrl) {
        photoSection += `Direct Photo Link: ${photoUrl}\n(Tap/Click link to view & download the custom cake photo)\n`;
      } else {
        photoSection += `Photo Attached: "${photoFile.name}" (Sending directly in this chat)\n`;
      }
    }

    const text = `Hi Butterly Bakery! I'd like to order a Custom Cake.

Cake Flavor: ${flavorText}
Dietary: ${dietaryText}${isRedVelvetSelected ? ' (*Egg only)' : ''}
Frosting: ${frostingText}
Size: ${sizeText}
Custom Photo: ${photoSection}

${message ? `Special Request / Message on Cake:\n"${message}"\n\n` : ''}Please confirm my order and baking schedule!`;

    setSent(true);

    // Attempt to copy image to clipboard for easy pasting in WhatsApp Web
    if (photoFile && navigator.clipboard && window.ClipboardItem) {
      try {
        const item = new ClipboardItem({ [photoFile.type]: photoFile });
        navigator.clipboard.write([item]);
      } catch {
        // ignore
      }
    }

    toast.success('Opening WhatsApp with your cake details...', { duration: 3000 });

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
      setSent(false);
    }, 900);
  };

  return (
    <>
      <Helmet>
        <title>Custom Cake Builder | Butterly Bakery</title>
        <meta name="description" content="Design your custom cake with Butterly Bakery. Choose your favorite flavor, egg or eggless preference, frosting, size, and upload your photo for custom cake." />
      </Helmet>

      <section className="section-container" style={{ paddingTop: '3rem', minHeight: '80vh', paddingBottom: '4rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag" data-aos="fade-up">Bespoke Celebrations</span>
          <h1 className="section-title" data-aos="fade-up">Custom Cake Builder</h1>
          <p className="section-subtitle" data-aos="fade-up" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Personalize every layer of your celebration cake. Choose your flavor, dietary preference, frosting, size, and upload your photo for custom cake.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '3rem', 
          flexWrap: 'wrap',
          padding: '0 1rem' 
        }}>
          {steps.map((s, i) => {
            const isCurrent = i === currentStep;
            const isCompleted = s.key === 'photo' ? Boolean(photoFile) : Boolean(selections[s.key]);

            return (
              <div 
                key={s.key} 
                onClick={() => setCurrentStep(i)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  cursor: 'pointer',
                  minWidth: '70px'
                }}
              >
                <div 
                  style={{ 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '50%', 
                    background: isCurrent 
                      ? 'var(--primary)' 
                      : isCompleted 
                        ? '#D8F3DC' 
                        : 'var(--bg-warm)', 
                    border: `2px solid ${isCurrent 
                      ? 'var(--primary)' 
                      : isCompleted 
                        ? '#52B788' 
                        : 'var(--border-light)'}`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    color: isCurrent 
                      ? '#FFFFFF' 
                      : isCompleted 
                        ? '#1B4332' 
                        : 'var(--text-muted)',
                    boxShadow: isCurrent 
                      ? '0 4px 12px rgba(45, 106, 79, 0.25)' 
                      : isCompleted 
                        ? '0 2px 8px rgba(82, 183, 136, 0.2)' 
                        : 'none'
                  }}
                >
                  {isCompleted && !isCurrent ? '✓' : i + 1}
                </div>
                <span style={{ 
                  fontSize: '0.74rem', 
                  color: isCurrent ? 'var(--primary)' : isCompleted ? '#1B4332' : 'var(--text-muted)', 
                  fontWeight: isCurrent ? 700 : 500,
                  textAlign: 'center'
                }}>
                  {s.title.replace('Choose Your ', '').replace('Select Your ', '').replace('Pick Your ', '')}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Main Step Content */}
          <div style={{ flex: 2, minWidth: '320px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28 }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      background: '#E8F7EE', 
                      color: '#2D6A4F', 
                      fontWeight: 700, 
                      padding: '3px 10px', 
                      borderRadius: '20px',
                      border: '1px solid #B7E4C7'
                    }}>
                      Step {currentStep + 1} of {steps.length}
                    </span>
                    <h2 style={{ fontSize: '1.45rem', margin: 0, color: 'var(--text-dark)' }}>
                      {currentStepDef.title}
                    </h2>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                    {currentStepDef.subtitle}
                  </p>
                </div>

                {/* Red Velvet notification banner on Step 2 (Dietary) */}
                {currentStepDef.key === 'dietary' && isRedVelvetSelected && (
                  <div style={{
                    background: '#FFF9E6',
                    border: '1.5px solid #F5D374',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem 1.1rem',
                    marginBottom: '1.5rem',
                    color: '#8A5800'
                  }}>
                    <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                      * Red Velvet Notice:
                    </strong>
                    <span style={{ fontSize: '0.82rem' }}>
                      Red Velvet is exclusively crafted in the traditional recipe containing egg. Eggless preparation is not available for this flavor.
                    </span>
                  </div>
                )}

                {/* Options Grid (for steps 1 to 4) */}
                {currentStepDef.options && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: currentStepDef.key === 'dietary' 
                      ? 'repeat(auto-fit, minmax(240px, 1fr))' 
                      : 'repeat(auto-fill, minmax(190px, 1fr))', 
                    gap: '0.9rem' 
                  }}>
                    {currentStepDef.options.map((opt) => {
                      const isSelected = selections[currentStepDef.key]?.id === opt.id;
                      const isEgglessDisabled = currentStepDef.key === 'dietary' && opt.id === 'eggless' && isRedVelvetSelected;

                      return (
                        <div 
                          key={opt.id} 
                          onClick={() => {
                            if (isEgglessDisabled) {
                              toast.error('* Red Velvet contains egg only. Eggless is not available.');
                              return;
                            }
                            select(currentStepDef.key, opt);
                          }}
                          style={{ 
                            position: 'relative',
                            background: isSelected 
                              ? 'linear-gradient(135deg, #EBF9F1 0%, #D8F3DC 100%)' 
                              : isEgglessDisabled 
                                ? '#F7F7F7' 
                                : 'var(--bg-card)', 
                            border: isSelected 
                              ? '2px solid #40916C' 
                              : isEgglessDisabled 
                                ? '1.5px dashed #D0D0D0' 
                                : '1.5px solid var(--border-card)', 
                            borderRadius: 'var(--radius-md)', 
                            padding: '1.25rem', 
                            cursor: isEgglessDisabled ? 'not-allowed' : 'pointer', 
                            transition: 'all 0.25s ease',
                            color: isEgglessDisabled 
                              ? '#999999' 
                              : isSelected 
                                ? '#133826' 
                                : 'var(--text-dark)',
                            boxShadow: isSelected 
                              ? '0 4px 16px rgba(45, 106, 79, 0.12)' 
                              : 'var(--shadow-sm)',
                            opacity: isEgglessDisabled ? 0.65 : 1
                          }}
                        >
                          {/* Checkmark icon for selected option */}
                          {isSelected && (
                            <div style={{ 
                              position: 'absolute', 
                              top: '12px', 
                              right: '12px', 
                              width: '24px', 
                              height: '24px', 
                              borderRadius: '50%', 
                              background: '#40916C', 
                              color: '#FFFFFF', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontSize: '0.8rem', 
                              fontWeight: 'bold',
                              boxShadow: '0 2px 6px rgba(45, 106, 79, 0.2)'
                            }}>
                              ✓
                            </div>
                          )}

                          {/* Top Badges */}
                          {opt.badge && (
                            <div style={{ marginBottom: '0.35rem' }}>
                              <span style={{ 
                                fontSize: '0.72rem', 
                                fontWeight: 700, 
                                background: opt.hasAsterisk || opt.badge.includes('*') ? '#FFECC7' : '#D8F3DC', 
                                color: opt.hasAsterisk || opt.badge.includes('*') ? '#8A5800' : '#1B4332', 
                                padding: '2px 8px', 
                                borderRadius: '12px' 
                              }}>
                                {opt.badge}
                              </span>
                            </div>
                          )}
                          {isEgglessDisabled && (
                            <div style={{ marginBottom: '0.35rem' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 600, background: '#FDE8E8', color: '#9B1C1C', padding: '2px 6px', borderRadius: '4px' }}>
                                * Not Available for Red Velvet
                              </span>
                            </div>
                          )}

                          <h4 style={{ 
                            fontFamily: '"DM Sans", sans-serif', 
                            fontWeight: 600, 
                            marginBottom: '0.35rem', 
                            fontSize: '0.98rem',
                            paddingRight: isSelected ? '1.5rem' : '0'
                          }}>
                            {opt.label}
                          </h4>

                          <p style={{ 
                            fontSize: '0.82rem', 
                            color: isSelected ? '#2D6A4F' : 'var(--text-muted)', 
                            lineHeight: 1.45,
                            margin: 0
                          }}>
                            {opt.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Step 5: Upload Your Photo for Custom Cake */}
                {currentStepDef.key === 'photo' && (
                  <div style={{ 
                    background: 'var(--bg-card)', 
                    border: '2px dashed #52B788', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: '2rem 1.5rem',
                    textAlign: 'center'
                  }}>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handlePhotoSelect} 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                    />

                    {!photoPreview ? (
                      <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                          Upload Your Photo for Custom Cake
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                          Upload your reference photo, theme design, or photo to print. It will be sent directly to WhatsApp with your order!
                        </p>
                        <button 
                          type="button"
                          className="btn btn-primary"
                          onClick={() => fileInputRef.current?.click()}
                          style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                        >
                          Choose Photo
                        </button>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
                          Supports JPG, PNG, WEBP (Max 15MB) • Optional step
                        </p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
                        <div style={{ 
                          maxWidth: '320px', 
                          maxHeight: '320px', 
                          borderRadius: 'var(--radius-md)', 
                          overflow: 'hidden', 
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          margin: '0 auto',
                          background: '#FDFBF7'
                        }}>
                          <img 
                            src={photoPreview} 
                            alt="Custom Cake Photo Preview" 
                            style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain', display: 'block' }} 
                          />
                        </div>

                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
                            {photoFile?.name}
                          </p>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {(photoFile?.size / (1024 * 1024)).toFixed(2)} MB • Ready for order
                          </p>
                        </div>

                        {uploadingPhoto && (
                          <div style={{ fontSize: '0.85rem', color: '#B7791F' }}>
                            Uploading photo for WhatsApp direct link...
                          </div>
                        )}

                        {photoUrl && !uploadingPhoto && (
                          <div style={{ 
                            background: '#E8F7EE', 
                            border: '1px solid #52B788', 
                            borderRadius: 'var(--radius-sm)', 
                            padding: '8px 16px', 
                            fontSize: '0.84rem', 
                            color: '#1B4332'
                          }}>
                            Direct photo link generated! Ready to send directly to WhatsApp.
                          </div>
                        )}

                        {uploadError && !uploadingPhoto && (
                          <div style={{ 
                            background: '#FFF9E6', 
                            border: '1px solid #F5D374', 
                            borderRadius: 'var(--radius-sm)', 
                            padding: '8px 14px', 
                            fontSize: '0.82rem', 
                            color: '#8A5800' 
                          }}>
                            {uploadError}
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => fileInputRef.current?.click()}
                            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                          >
                            Change Photo
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={clearPhoto}
                            style={{ padding: '8px 18px', fontSize: '0.85rem', color: '#C53030' }}
                          >
                            Remove Photo
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={copyImageToClipboard}
                            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                            title="Copy image to paste into WhatsApp Web"
                          >
                            Copy Photo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem' }}>
              {currentStep > 0 && (
                <button 
                  className="btn btn-secondary" 
                  onClick={prev} 
                  style={{ padding: '10px 24px' }}
                >
                  ← Back
                </button>
              )}
              {currentStep < steps.length - 1 && (
                <button 
                  className="btn btn-primary" 
                  onClick={next} 
                  disabled={currentStepDef.key !== 'photo' && !selections[currentStepDef.key]} 
                  style={{ 
                    padding: '10px 26px', 
                    opacity: currentStepDef.key === 'photo' || selections[currentStepDef.key] ? 1 : 0.5 
                  }}
                >
                  Continue →
                </button>
              )}
            </div>
          </div>

          {/* Live Order Summary Sidebar */}
          <div style={{ flex: 1, minWidth: '280px', position: 'sticky', top: '90px' }}>
            <div style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-card)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.75rem', 
              boxShadow: 'var(--shadow-md)' 
            }}>
              <h3 style={{ 
                fontSize: '1.15rem', 
                marginBottom: '1.25rem', 
                paddingBottom: '0.85rem', 
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Order Summary</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                  {Object.keys(selections).filter(k => selections[k]).length + (photoFile ? 1 : 0)}/{steps.length} Steps
                </span>
              </h3>

              {steps.map((s, i) => {
                const selectedOpt = selections[s.key];
                const isPhotoStep = s.key === 'photo';
                const isStepActive = isPhotoStep ? Boolean(photoFile) : Boolean(selectedOpt);

                return (
                  <div key={s.key} style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%',
                      background: isStepActive ? '#D8F3DC' : 'var(--bg-warm)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      color: isStepActive ? '#1B4332' : 'var(--text-muted)',
                      flexShrink: 0,
                      border: `1px solid ${isStepActive ? '#52B788' : 'var(--border-light)'}`
                    }}>
                      {isStepActive ? '✓' : i + 1}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.1rem', fontWeight: 500 }}>
                        {s.title}
                      </p>
                      <p style={{ 
                        fontWeight: 600, 
                        color: isStepActive ? 'var(--text-dark)' : 'var(--text-muted)', 
                        fontSize: '0.88rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {isPhotoStep 
                          ? (photoFile ? 'Photo Uploaded' : 'Optional') 
                          : (selectedOpt?.label || 'Not selected')}
                        {s.key === 'flavor' && selectedOpt?.id === 'redvelvet' ? ' (Egg Only)' : ''}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Photo preview thumbnail in summary */}
              {photoPreview && (
                <div style={{ 
                  margin: '0.75rem 0', 
                  padding: '8px 12px', 
                  background: '#E8F7EE', 
                  borderRadius: 'var(--radius-sm)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem' 
                }}>
                  <img 
                    src={photoPreview} 
                    alt="Upload thumbnail" 
                    style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover', border: '1.5px solid #52B788' }} 
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1B4332', margin: 0 }}>
                      Custom Photo Attached
                    </p>
                    <p style={{ fontSize: '0.68rem', color: '#2D6A4F', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {photoUrl ? 'Direct WhatsApp link ready' : photoFile?.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Special Request & Order Button */}
              <div style={{ marginTop: '1.25rem' }}>
                <textarea
                  placeholder="Special instructions? (Name/Message on cake, theme colors, delivery date, etc.)"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    borderRadius: 'var(--radius-sm)', 
                    border: '1.5px solid var(--border-light)', 
                    background: 'var(--bg-warm)', 
                    color: 'var(--text-dark)', 
                    fontSize: '0.86rem', 
                    resize: 'vertical', 
                    marginBottom: '0.75rem', 
                    fontFamily: 'inherit' 
                  }}
                />

                <button 
                  className="btn" 
                  onClick={handleOrder} 
                  disabled={sent || !allRequiredSelected}
                  style={{ 
                    width: '100%', 
                    background: allRequiredSelected ? '#25D366' : '#A0A0A0', 
                    color: 'white', 
                    border: 'none', 
                    fontSize: '0.95rem', 
                    fontWeight: 600,
                    padding: '12px', 
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: allRequiredSelected ? 'pointer' : 'not-allowed',
                    boxShadow: allRequiredSelected ? '0 4px 14px rgba(37, 211, 102, 0.35)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  {sent ? 'Opening WhatsApp...' : 'Order via WhatsApp'}
                </button>

                <p style={{ 
                  fontSize: '0.72rem', 
                  color: 'var(--text-muted)', 
                  textAlign: 'center', 
                  marginTop: '0.6rem' 
                }}>
                  {photoFile 
                    ? 'Photo link is prefilled in WhatsApp message' 
                    : 'Direct chat with our baker on WhatsApp'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Customizations;
