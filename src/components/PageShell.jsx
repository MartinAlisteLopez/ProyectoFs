import SiteHeader from './SiteHeader.jsx';
import InfoSection from './InfoSection.jsx';
import FooterSection from './FooterSection.jsx';

export default function PageShell({ children }) {
  return (
    <div>
      <div className="hero_area">
        <SiteHeader />
      </div>
      {children}
      <InfoSection />
      <FooterSection />
    </div>
  );
}
