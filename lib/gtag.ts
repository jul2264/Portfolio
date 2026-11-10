export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

type AnalyticsWindow = Window & {
  gtag?: (command: 'event', action: string, parameters: {
    event_category: string;
    event_label: string;
    value?: number;
  }) => void;
};

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== 'undefined') {
    (window as AnalyticsWindow).gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

export const trackResumeDownload = () => {
  trackEvent('download_resume', 'Engagement', 'Julian_Steve_Anban_Resume.pdf');
};

export const trackContactClick = (channel: string) => {
  trackEvent('contact_click', 'Contact', channel);
};

export const trackProjectView = (projectId: string) => {
  trackEvent('view_project', 'Projects', projectId);
};
