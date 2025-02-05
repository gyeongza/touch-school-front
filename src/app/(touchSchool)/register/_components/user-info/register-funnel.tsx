'use client';

import useFunnel from '@/shared/hooks/useFunnel';
import SchoolForm from './school-form';
import NameForm from './name-form';
import ClassForm from './class-form';
import { useRegisterState } from '../../_store';
import { Suspense } from 'react';

export type RegisterFunnelStep = 'name' | 'school' | 'class';

export default function RegisterFunnel() {
  const { currentStep } = useRegisterState();
  const { Funnel, Step } = useFunnel<RegisterFunnelStep>();

  return (
    <Funnel currentStep={currentStep}>
      <Step name="name">
        <Suspense fallback={<div>Loading...</div>}>
          <NameForm />
        </Suspense>
      </Step>
      <Step name="school">
        <SchoolForm />
      </Step>
      <Step name="class">
        <ClassForm />
      </Step>
    </Funnel>
  );
}
