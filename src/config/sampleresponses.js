export default {
  mobilityLogin: () => ({
    data: {
      results: [{
        response: {
          sessionId:
            'aWNTZXNzaW9uSWQ6bWE3VUVYdHhSZnJxclZseVpiTHdudTZVTmh2WVYwZThWck8wdjdOTERXZEJ4QjQ1WFlGOU8xZXFqRUlEQndWVmZOejNNWiUyQmtqSjNlJTBBaEdrQm5NdDNxQSUzRCUzRA==', //eslint-disable-line
          language: 'en',
          country: '',
          stationCode: 'SYD',
          ownAirlineCode: 'QF',
          airportCode: 'SYD',
          defaultWarehouseCode: 'SYDWH01',
          companyCode: 'QF',
          roleGroupCode: 'CST',
          userId: 'ICARGO1',
          dateFormat: 'dd-MMM-yyyy',
          timeFormat: 'HH:mm:ss',
          dateAndTimeFormat: 'dd-MMM-yyyy HH:mm:ss',
          ownAirlineIdentifier: 1081,
          defaultOfficeCode: 'SYD',
          firstName: 'ICARGO SYSADMIN USER',
          userParameters: '',
          error1: 'Login Failed!'
        }
      }]
    }
  }),
  getUserMenu: () => ({
    data: {
      results: [{
        menu: [
          {
            code: 'MOBIMP',
            name: 'Import',
            order: '2',
            menu: [
              {
                code: 'MOB010',
                name: 'Task List',
                order: '1',
                className: 'icargoMobile.view.workflow.defaults.TaskListView' //eslint-disable-line
              },
              {
                code: 'MOB011',
                name: 'Photo Doc',
                order: '3',
                className:
                  'icargoMobile.view.operations.producthandling.PhotoDocumentationView' //eslint-disable-line
              },
              {
                code: 'MOB012',
                name: 'PPS & Task List',
                order: '4',
                className:
                  'icargoMobile.view.warehouse.defaults.taskList.PPSTaskListView' //eslint-disable-line
              },
              {
                code: 'MOB013',
                name: 'CheckSheet',
                order: '5',
                className:
                  'icargoMobile.view.operations.producthandling.CheckSheetAWBEntryView' //eslint-disable-line
              },
              {
                code: 'MOB014',
                name: 'CheckSheet',
                order: '5',
                className:
                  'icargoMobile.view.operations.producthandling.CheckSheetAWBEntryView' //eslint-disable-line
              },
              {
                code: 'MOB015',
                name: 'CheckSheet',
                order: '5',
                className:
                  'icargoMobile.view.operations.producthandling.CheckSheetAWBEntryView' //eslint-disable-line
              }
            ]
          }
        ]
      }]
    }
  })
};
