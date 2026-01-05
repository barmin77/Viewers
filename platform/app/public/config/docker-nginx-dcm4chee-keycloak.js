/** @type {AppTypes.Config} */
window.config = {
  routerBasename: '/ohif-viewer/',
  showStudyList: true,
  customizationService: [
    {
      'studyBrowser.viewPresets': {
        $set: [
          {
            id: 'list',
            iconName: 'ListView',
            selected: true, // Makes the list view the default selected option
          },
          {
            id: 'thumbnails',
            iconName: 'ThumbnailView',
            selected: false,
          },
        ],
      },
    },
    {
      'viewportOverlay.topLeft': {
        $splice: [
        [1, 1], // Remove 1 item starting at index 1 (removes SeriesDesc)
        ],
        $push: [
        {
          id: 'StudyTime',
          inheritsFrom: 'ohif.overlayItem',
          label: 'Study Time',
          title: 'Study time',
          condition: ({ instance }) => instance && instance.StudyTime,
          contentF: ({ instance, formatters: { formatTime } }) =>
          formatTime(instance.StudyTime),
        },
        {
          id: 'SeriesDescription',
          inheritsFrom: 'ohif.overlayItem',
          attribute: 'SeriesDescription',
          label: '',
          title: 'Series description',
          condition: ({ instance }) => instance && instance.SeriesDescription,
          contentF: ({ instance }) => instance.SeriesDescription,
        },
        {
          id: 'SeriesTime',
          inheritsFrom: 'ohif.overlayItem',
          attribute: 'SeriesTime',
          label: 'Series Time',
          title: 'Series time',
          condition: ({ instance }) => instance && instance.SeriesTime,
          contentF: ({ instance, formatters: { formatTime } }) =>
          formatTime(instance.SeriesTime),
        },
        ],
      },
      'viewportOverlay.bottomLeft': {
        $push: [
           {
            id: 'StudyDescription',
            inheritsFrom: 'ohif.overlayItem',
            label: 'Info:',
            title: '`Study Description:',
            color: 'yellow',
            condition: ({ instance }) => instance && instance.StudyDescription,
            contentF: ({ instance }) => instance.StudyDescription,
          },
        ],
      },
    },
  ],

  extensions: [],
  modes: [],
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  // some windows systems have issues with more than 3 web workers
  //maxNumberOfWebWorkers: 3,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  experimentalStudyBrowserSort: true,
  strictZSpacingForVolumeViewport: true,
  defaultDataSourceName: 'dicomweb',
  showErrorDetails: 'production', // 'always', 'dev', 'production'
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'Dcm4chee Server',
        name: 'Dcm4chee',
        wadoUriRoot: 'https://s2.berger-medit.eu/pacs',
        qidoRoot: 'https://s2.berger-medit.eu/pacs',
        wadoRoot: 'https://s2.berger-medit.eu/pacs',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        dicomUploadEnabled: false,
        omitQuotationForMultipartRequest: true,
      },
    },
  ],
 };
