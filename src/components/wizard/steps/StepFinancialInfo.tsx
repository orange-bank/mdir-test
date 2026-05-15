'use client';

import { useState } from 'react';
import type { StepFinancialInfo, StepFinancialInfoDebtEntry } from '@/components';
import { Input } from '@/components';
import { cn } from '@/lib/utils';

interface StepFinancialInfoProps {
    values: StepFinancialInfo;
    errors: Record<string, string>;
    onChange: (values: Partial<StepFinancialInfo>) => void;
}

const EMPLOYMENT_STATUSES = [
    { value: '', label: 'Select employment status' },
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'self_employed', label: 'Self-Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'retired', label: 'Retired' },
    { value: 'student', label: 'Student' },
];

type DebtEntry = {
    description: string;
    amount: string;
    monthlyRepayment: string;
};

function DebtRow({
    index,
    debt,
    errors,
    onChange,
    onRemove,
}: {
    index: number;
    debt: DebtEntry;
    errors: Record<string, string>;
    onChange: (field: keyof DebtEntry, value: string) => void;
    onRemove: () => void;
}) {
    return (
        <div className="grid sm:grid-cols-3 gap-4 items-end">
            <Input
                label="Description"
                placeholder="e.g. Car Loan"
                value={debt.description}
                error={errors[`debt_${index}_description`]}
                onChange={(e) => onChange('description', e.target.value.trim())}
                className="w-full"
            />
            <Input
                label="Amount Owed"
                type="number"
                placeholder="e.g. 15000"
                value={debt.amount}
                error={errors[`debt_${index}_amount`]}
                onChange={(e) => onChange('amount', e.target.value)}
                hint="Total amount borrowed"
                className="w-full"
            />
            <div className="flex gap-2">
                <Input
                    label="Monthly Repayment"
                    type="number"
                    placeholder="e.g. 500"
                    value={debt.monthlyRepayment}
                    error={errors[`debt_${index}_monthlyRepayment`]}
                    onChange={(e) => onChange('monthlyRepayment', e.target.value)}
                    className="w-full"
                />
                <button
                    type="button"
                    onClick={onRemove}
                    className={cn(
                        'flex items-center justify-center w-[44px] h-[44px] rounded-[10px] border',
                        'border-[var(--ob-border)] border-solid',
                        'text-[var(--ob-error)] hover:bg-[var(--ob-error)]/5 active:bg-[var(--ob-error)]/10 transition-colors',
                    )}
                    title="Remove debt"
                    disabled={false}
                >
                    x
                </button>
            </div>
        </div>
    );
}

export default function StepFinancialInfo({ values, errors, onChange }: StepFinancialInfoProps) {
    const [debtEntries, setDebtEntries] = useState<DebtEntry[]>(values.debts || [{ description: '', amount: '', monthlyRepayment: '' }]);

    const handleDebtChange = (
        index: number,
        field: keyof DebtEntry,
        value: string,
    ) => {
        const updated = debtEntries.map((d, i) => (i === index ? { ...d, [field]: value } : d));
        setDebtEntries(updated);
        onChange({ debts: updated });
    };

    const handleDebtRemove = (index: number) => {
        const updated = debtEntries.filter((_, i) => i !== index);
        setDebtEntries(updated);
        onChange({ debts: updated.length ? updated : [{ description: '', amount: '', monthlyRepayment: '' }] });
    };

    const addDebt = () => {
        const updated = [...debtEntries, { description: '', amount: '', monthlyRepayment: '' }];
        setDebtEntries(updated);
        onChange({ debts: updated });
    };

    return (
        <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
                <Input
                    label="Annual Income"
                    type="number"
                    placeholder="e.g. 75000"
                    value={values.annualIncome}
                    error={errors.annualIncome}
                    onChange={(e) => onChange({ annualIncome: e.target.value.replace(/[^0-9.]/g, '').trim() || '0' })}
                    hint="Before tax, all sources"
                    className="w-full"
                />
                <div>
                    <label
                        htmlFor="employment-status"
                        className="text-sm font-medium"
                        style={{ color: "var(--ob-charcoal)" }}
                    >
                        Employment Status
                    </label>
                    <select
                        id="employment-status"
                        value={values.employmentStatus}
                        onChange={(e) => onChange({ employmentStatus: e.target.value })}
                        className={cn(
                            "w-full h-11 px-4 text-sm rounded-lg border outline-none transition-all",
                            "bg-white border-[var(--ob-border)]",
                            "focus:border-[var(--ob-orange)] focus:ring-2 focus:ring-[var(--ob-orange)]/20",
                            "disabled:bg-[var(--ob-bg)] disabled:cursor-not-allowed disabled:opacity-60",
                            "appearance-none cursor-pointer",
                            !values.employmentStatus && "text-[var(--ob-slate-light)]",
                            errors.employmentStatus &&
                                "border-[var(--ob-error)] focus:border-[var(--ob-error)] focus:ring-[var(--ob-error)]/20",
                        )}
                    >
                        {EMPLOYMENT_STATUSES.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                    {errors.employmentStatus && (
                        <p className="text-xs" style={{ color: "var(--ob-error)" }}>
                            {errors.employmentStatus}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <Input
                    label="Monthly Rent / Mortgage"
                    type="number"
                    placeholder="e.g. 1800"
                    value={values.monthlyRentMortgage}
                    error={errors.monthlyRentMortgage}
                    onChange={(e) => onChange({ monthlyRentMortgage: e.target.value.replace(/[^0-9.]/g, '').trim() || '0' })}
                    hint="Property where you live"
                    className="w-full"
                />
                <Input
                    label="Bank Statements"
                    placeholder="5"
                    type="number"
                    value={values.bankStatements}
                    error={errors.bankStatements}
                    onChange={(e) => onChange({ bankStatements: e.target.value.replace(/[^0-9]/g, '').trim() || '0' })}
                    hint="Months available"
                    className="w-full"
                />
            </div>

            <div className={cn(
                'grid gap-4 pt-4 mt-4',
                'border-t border-solid border-[var(--ob-border)]',
            )}>
                <h3 className="text-[var(--ob-charcoal)] font-[600] text-[15px] leading-tight">
                    Existing Debts & Loans
                </h3>

                {debtEntries.map((debt, i) => (
                    <DebtRow
                        key={i}
                        index={i}
                        debt={debt}
                        errors={errors}
                        onChange={(field, value) => handleDebtChange(i, field, value)}
                        onRemove={() => handleDebtRemove(i)}
                    />
                ))}

                <button
                    type="button"
                    onClick={addDebt}
                    className={cn(
                        'text-[var(--ob-orange)] font-[500] text-[14px] hover:text-[var(--ob-orange)]/80',
                        'transition-colors mt-2',
                    )}
                >
                    + Add Another Debt
                </button>
            </div>
        </div>
    );
}

