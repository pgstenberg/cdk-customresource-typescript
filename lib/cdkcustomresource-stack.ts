import * as cdk from '@aws-cdk/core';
import cfn = require('@aws-cdk/aws-cloudformation');
import lambda = require('@aws-cdk/aws-lambda');
import * as fs from 'fs';

interface MyCustomResourceProps {
  message: string;
}



export class MyCustomResource extends cdk.Construct {

  public readonly response: string;

  constructor(scope: cdk.Construct, name: string, props: MyCustomResourceProps) {
    super(scope, name);
  

    const myProvider = cfn.CustomResourceProvider.lambda(new lambda.SingletonFunction(this, 'Singleton', {
      uuid: '0efa3640-400c-4e94-9866-737d677728bc',
      code: new lambda.InlineCode(
        fs.readFileSync('./lib/resources/mycustomresource/index.js', { encoding: 'utf-8' })),
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_12_X,
    }))
    
    const resource = new cdk.CustomResource(this, 'Resource', {
      serviceToken: myProvider.serviceToken,
      properties: props,
    });

    this.response = resource.getAtt('Response').toString();
    
  }
}

export class CdkCustomResourceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const resource = new MyCustomResource(this, 'MyCustomResource', {
      message: 'Hello world from CDK!',
    });

    new cdk.CfnOutput(this, 'ResponseMessage', {
      description: 'The message that came back from the Custom Resource',
      value: resource.response
    });

  }
}
