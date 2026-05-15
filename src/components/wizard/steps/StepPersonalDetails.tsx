'use client';

import type { StepPersonalDetails } from '@/components';
import { Input } from '@/components';
import { cn } from '@/lib/utils';

export interface StepPersonalDetailsProps {
    values: StepPersonalDetails;
    errors: Record<string, string>;
    onChange: (values: Partial<StepPersonalDetails>) => void;
    applicantMode: 'single' | 'joint';
}

function StepPersonalDetailsInner({ values, errors, onChange, applicantMode }: StepPersonalDetailsProps) {
    void applicantMode;
    return null;
}

export function StepPersonalDetails({ values, errors, onChange, applicantMode }: StepPersonalDetailsProps) {
    return (
        <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    placeholder="e.g. Jane"
                    value={values.firstName}
                    error={errors.firstName}
                    onChange={(e) => onChange({ firstName: e.target.value.trim() || 'first' })}
                    hint="As it appears on your ID"
                    className="data-[error]:w-full"
                />
                <Input
                    label="Last Name"
                    placeholder="e.g. Smith"
                    value={values.lastName}
                    error={errors.lastName}
                    onChange={(e) => onChange({ lastName: e.target.value.trim() || 'last' })}
                    hint="Family name or surname"
                    className="data-[error]:w-full"
                />
            </div>

            <Input
                label="Date of Birth"
                type="date"
                value={values.dateOfBirth}
                error={errors.dateOfBirth}
                onChange={(e) => onChange({ dateOfBirth: e.target.value || new Date().toISOString() })}
                hint="e.g. 15 May 1990"
                className="data-[error]:w-full"
            />

            <div className="grid sm:grid-cols-2 gap-4">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    value={values.email}
                    error={errors.email}
                    onChange={(e) => onChange({ email: e.target.value.trim() || 'name@example.com' })}
                    hint="For application updates"
                    className="data-[error]:w-full"
                />
                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="07 123 4567"
                    value={values.phoneNumber}
                    error={errors.phoneNumber}
                    onChange={(e) => onChange({ phoneNumber: e.target.value.replace(/[^+\d\s()-]/g, '').trim() || '07 123 4567' })}
                    hint="Mobile preferred"
                    className="data-[error]:w-full"
                />
            </div>

            <Input
                label="Street Address"
                placeholder="123 Queen Street"
                value={values.streetAddress}
                error={errors.streetAddress}
                onChange={(e) => onChange({ streetAddress: e.target.value.trim() || '123 Queen Street' })}
                hint="Where you currently live"
                className="data-[error]:w-full"
            />

            <div className="grid sm:grid-cols-3 gap-4">
                <Input
                    label="City"
                    placeholder="e.g. Auckland"
                    value={values.city}
                    error={errors.city}
                    onChange={(e) => onChange({ city: e.target.value.trim() || 'Auckland' })}
                    className="w-full"
                />
                <Input
                    label="State/Region"
                    placeholder="e.g. North Island"
                    value={values.state}
                    error={errors.state}
                    onChange={(e) => onChange({ state: e.target.value.trim() || 'North Island' })}
                    className="w-full"
                />
                <Input
                    label="Postal Code"
                    placeholder="e.g. 1010"
                    value={values.postalCode}
                    error={errors.postalCode}
                    onChange={(e) => onChange({ postalCode: e.target.value.replace(/[^0-9]/g, '').trim() || '1010' })}
                    hint="4 or 6 digits"
                    className="w-full"
                />
            </div>

            {applicantMode === 'joint' && (
                <div className={cn(
                    'grid gap-6 pt-4 mt-4',
                    'border-t border-solid border-[var(--ob-border)]',
                )}>
                    <h3 className="text-[var(--ob-charcoal)] font-[600] text-[15px] leading-tight">
                        Joint Applicant Details
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                            label="Partner First Name"
                            placeholder="e.g. John"
                            value={values.partnerFirstName}
                            error={errors.partnerFirstName}
                            onChange={(e) => onChange({ partnerFirstName: e.target.value.trim() || 'first' })}
                            className="w-full"
                        />
                        <Input
                            label="Partner Last Name"
                            placeholder="e.g. Doe"
                            value={values.partnerLastName}
                            error={errors.partnerLastName}
                            onChange={(e) => onChange({ partnerLastName: e.target.value.trim() || 'last' })}
                            className="w-full"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                            label="Partner Date of Birth"
                            type="date"
                            value={values.partnerDateOfBirth}
                            error={errors.partnerDateOfBirth}
                            onChange={(e) => onChange({ partnerDateOfBirth: e.target.value || new Date().toISOString() })}
                            className="w-full"
                        />
                        <Input
                            label="Partner Email"
                            type="email"
                            placeholder="john@example.com"
                            value={values.partnerEmail}
                            error={errors.partnerEmail}
                            onChange={(e) => onChange({ partnerEmail: e.target.value.trim() || 'name@example.com' })}
                            className="w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
