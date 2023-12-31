import type { ThemeConfig } from 'antd';
  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: '#7f1078',
      colorTextHeading: 'var(--md-sys-color-on-primary-container)',
      colorText: 'var(--md-sys-color-on-background)',
      colorBorder:  'transparent',
      colorBgContainer: 'var(--md-sys-color-on-secondary-container)',
      colorBgTextHover:'yellow',
      colorTextLightSolid:'var(--md-sys-color-primary)',// tooltip text
      colorTextDisabled:'var(--md-sys-color-outline-variant)',
      // colorPrimaryHover:'var(--md-ref-palette-primary10)'
    },
    components: {
      Button: {
        defaultBg:'var(--md-sys-color-secondary-container)',
        defaultBorderColor:'var(--md-ref-palette-secondary50)',
        defaultColor:'var(--md-sys-color-on-secondary-container)',
        defaultGhostBorderColor:'var(--md-ref-palette-secondary50)',
        defaultGhostColor:'var(--md-sys-color-primary)',
        primaryColor:'var(--md-sys-color-on-secondary-container)',
        primaryShadow:'3px -3px var(--md-sys-color-secondary)',// shadow primary button
        borderColorDisabled:'var(--md-sys-color-outline-variant)',

      },
      Collapse:{contentBg: 'var(--md-sys-color-on-secondary)'},
      Progress: {defaultColor:'var(--md-sys-color-primary)' },
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