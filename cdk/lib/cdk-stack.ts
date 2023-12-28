import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi, Cors } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import path = require('path');
import 'dotenv/config';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartApiNestHandler = new NodejsFunction(this, 'CartApiNestHandler', {
      environment: {
        PG_HOST: process.env.PG_HOST!,
        PG_PORT: process.env.PG_PORT!,
        PG_DB: process.env.PG_DB!,
        PG_USER: process.env.PG_USER!,
        PG_PASSWORD: process.env.PG_PASSWORD!,
        PRODUCT_AWS_REGION: process.env.PRODUCT_AWS_REGION!,
      },
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.resolve(__dirname, '..', '..', 'dist', 'main.js'),
      functionName: 'cartApiNestHandler',
      timeout: cdk.Duration.seconds(15),
      memorySize: 1024,
    });

    const api = new LambdaRestApi(this, 'rss-cart-api', {
      restApiName: 'ElianRssCartService',
      description: 'CartService REST API',
      handler: cartApiNestHandler,
      deployOptions: {
        stageName: 'dev',
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      },
    });
  }
}
