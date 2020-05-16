#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkCustomResourceStack } from '../lib/cdkcustomresource-stack';

const app = new cdk.App();
new CdkCustomResourceStack(app, 'CdkCustomResourceStack');
