// Google Analytics (GA4) Event Telemetry Helper
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackResumeDownload = () => {
  trackEvent('download_resume', 'Engagement', 'Julian_Steve_A_Extended.pdf');
};

export const trackContactClick = (channel: string) => {
  trackEvent('contact_click', 'Contact', channel);
};

export const trackProjectView = (projectId: string) => {
  trackEvent('view_project', 'Projects', projectId);
};
