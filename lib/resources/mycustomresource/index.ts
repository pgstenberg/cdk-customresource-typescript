import * as lambda from 'aws-lambda';
import * as cfnresponse from 'cfn-response';

exports.handler = function (event:any, context: lambda.Context, callback: lambda.Callback) {
    console.log('REQUEST RECEIVED:\n' + JSON.stringify(event))

    const message:string = event.ResourceProperties.message;

    if (event.RequestType === 'Create') {
      cfnresponse.send(event, context, 'SUCCESS', { 
        'Response': 'Resource creation successful!\nyour input message was=' + message, 
      });
    } else if (event.RequestType === 'Update') {
      cfnresponse.send(event, context, 'SUCCESS', { 
        'Response': 'Resource update successful!\nyour input message was=' + message,
      });
    } else if (event.RequestType === 'Delete') {
      cfnresponse.send(event, context, 'SUCCESS', { 
        'Response': 'Resource deletion successful!\nyour input message was=' + message,
      })
    } else {
      cfnresponse.send(event, context, 'FAILED')
    }
  }