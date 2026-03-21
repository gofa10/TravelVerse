import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaXTwitter />, href: "#", label: "X (Twitter)" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  ];

  return (
    <MDBFooter
      className='text-center text-lg-start'
      style={{
        backgroundColor: 'var(--color-slate-900, #0f172a)',
        color: 'var(--color-slate-300, #cbd5e1)',
        marginTop: 'auto',
      }}
    >
      {/* Social Links Section */}
      <section
        className='d-flex justify-content-center justify-content-lg-between p-4'
        style={{
          borderBottom: '1px solid var(--color-slate-700, #334155)',
        }}
      >
        <div className='me-5 d-none d-lg-block'>
          <span style={{ fontSize: 'var(--font-size-sm, 0.875rem)' }}>
            {t('footer.social_connect')}
          </span>
        </div>

        <div className="d-flex gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className='text-reset'
              style={{
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#1e293b',
                color: '#cbd5e1',
                fontSize: '15px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </section>

      {/* Main Footer Content */}
      <section style={{ padding: 'var(--space-12, 48px) 0 var(--space-8, 32px)' }}>
        <MDBContainer className='text-center text-md-start'>
          <MDBRow className='mt-3'>
            {/* Brand Column */}
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6
                className='text-uppercase fw-bold mb-4'
                style={{
                  color: 'white',
                  fontSize: 'var(--font-size-lg, 1.125rem)',
                  letterSpacing: '0.05em',
                }}
              >
                <MDBIcon icon="globe" className="me-2" style={{ color: 'var(--color-primary-400, #60a5fa)' }} />
                {t('footer.company_name')}
              </h6>
              <p style={{
                fontSize: 'var(--font-size-sm, 0.875rem)',
                lineHeight: '1.7',
                color: 'var(--color-slate-400, #94a3b8)',
              }}>
                Discover breathtaking destinations, curated experiences, and unforgettable journeys with TravelVerse.
              </p>
            </MDBCol>

            {/* Explore Column */}
            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6
                className='text-uppercase fw-bold mb-4'
                style={{ color: 'white', fontSize: 'var(--font-size-sm, 0.875rem)' }}
              >
                {t('footer.products_title')}
              </h6>
              {['Destinations', 'Tours & Trips', 'Hotels', 'Experiences'].map((item, i) => (
                <p key={i} className="mb-2">
                  <Link
                    to={i === 0 ? '/destination/europe' : i === 1 ? '/trips' : '#'}
                    style={{
                      color: 'var(--color-slate-400, #94a3b8)',
                      fontSize: 'var(--font-size-sm, 0.875rem)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-400, #60a5fa)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-slate-400, #94a3b8)'}
                  >
                    {item}
                  </Link>
                </p>
              ))}
            </MDBCol>

            {/* Useful Links Column */}
            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6
                className='text-uppercase fw-bold mb-4'
                style={{ color: 'white', fontSize: 'var(--font-size-sm, 0.875rem)' }}
              >
                {t('footer.useful_links')}
              </h6>
              {[
                { text: t('footer.links.help'), link: '#' },
                { text: 'About Us', link: '#' },
                { text: 'Privacy Policy', link: '#' },
                { text: 'Terms of Service', link: '#' },
              ].map((item, i) => (
                <p key={i} className="mb-2">
                  <a
                    href={item.link}
                    style={{
                      color: 'var(--color-slate-400, #94a3b8)',
                      fontSize: 'var(--font-size-sm, 0.875rem)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-400, #60a5fa)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-slate-400, #94a3b8)'}
                  >
                    {item.text}
                  </a>
                </p>
              ))}
            </MDBCol>

            {/* Contact Column */}
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6
                className='text-uppercase fw-bold mb-4'
                style={{ color: 'white', fontSize: 'var(--font-size-sm, 0.875rem)' }}
              >
                {t('footer.contact_title')}
              </h6>
              <p style={{ fontSize: 'var(--font-size-sm, 0.875rem)', marginBottom: '12px' }}>
                <MDBIcon icon="home" className="me-2" style={{ color: 'var(--color-primary-400, #60a5fa)' }} />
                {t('footer.contact.address')}
              </p>
              <p style={{ fontSize: 'var(--font-size-sm, 0.875rem)', marginBottom: '12px' }}>
                <MDBIcon icon="envelope" className="me-2" style={{ color: 'var(--color-primary-400, #60a5fa)' }} />
                {t('footer.contact.email')}
              </p>
              <p style={{ fontSize: 'var(--font-size-sm, 0.875rem)', marginBottom: '12px' }}>
                <MDBIcon icon="phone" className="me-2" style={{ color: 'var(--color-primary-400, #60a5fa)' }} />
                + 01 234 567 88
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Copyright */}
      <div
        className='text-center p-4'
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          fontSize: 'var(--font-size-sm, 0.875rem)',
        }}
      >
        © {new Date().getFullYear()} {t('footer.company_name')}. All rights reserved.
      </div>
    </MDBFooter>
  );
}

export default Footer;

