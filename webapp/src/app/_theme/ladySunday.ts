import type { ThemeConfig } from 'antd';
  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: '#7f1078',
      colorTextHeading: 'var(--md-sys-color-on-primary-container)',
      colorText: 'var(--md-sys-color-on-background)',
      colorBorder:  'var(--md-sys-color-outline)',
      colorBgContainer: 'red',
      colorBgTextHover:'yellow',
      colorTextLightSolid:'var(--md-sys-color-primary)',// tooltip text
    },
    components: {
      Button: {
        defaultBg:'var(--md-sys-color-primary)',
        defaultBorderColor:'var(--md-sys-color-primary)',
        defaultColor:'var(--md-sys-color-on-primary)',
        defaultGhostBorderColor:'var(--md-sys-color-primary)',
        defaultGhostColor:'var(--md-sys-color-primary)',
        primaryColor:'var(--md-sys-color-on-secondary-container)',
        primaryShadow:'3px -3px var(--md-sys-color-secondary)',// shadow primary button
        borderColorDisabled:'var(--md-sys-color-outline)',

      },
      Collapse:{contentBg: 'var(--md-sys-color-on-secondary)'},
      Layout: {
        headerPadding: '0 1rem',
        footerPadding: '1.5rem 1rem',
        headerBg:'var(--md-sys-color-primary-container)',
        footerBg:'var(--md-sys-color-background)',

        siderBg:'var(--md-sys-color-secondary-container)',
        lightSiderBg:'var(--md-sys-color-secondary-container)',
      },
      Typography: {
        titleMarginTop: '1rem',
      },
    },
  };


export default themeConfig;