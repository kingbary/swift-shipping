import React, { useState } from 'react';
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
    FieldError,
} from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

type FormControlElement = 'input' | 'select' | 'textarea';
type InputProps = React.ComponentPropsWithoutRef<'input'>;
type SelectProps = {
    options: { value: string; label: string }[];
    placeholder?: string;
} & React.ComponentPropsWithoutRef<'select'>;
type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'>;
export type Register = UseFormRegister<FieldValues>;

type ControlProps = (
    | ({ as: 'input' } & InputProps)
    | ({ as: 'select' } & SelectProps)
    | ({ as: 'textarea' } & TextAreaProps)
) & {
    icon?: React.ReactNode;
    inputStyle?: boolean;
    onContainerFocus?: React.FocusEventHandler<HTMLDivElement>;
    containerClass?: string;
    labelText?: string;
    radius?: string;
    error?: string | FieldError;
    register?: Register;
    registerOptions?: RegisterOptions<FieldValues, Path<FieldValues>>;
};

function isSelect(as: FormControlElement, props: unknown): props is SelectProps {
    return as === 'select';
}

function isInput(as: FormControlElement, props: unknown): props is InputProps {
    return as === 'input';
}

export default function FormControl({
    as,
    icon,
    error,
    radius,
    labelText,
    inputStyle,
    containerClass,
    registerOptions,
    onContainerFocus,
    register = (() => ({})) as unknown as Register,
    ...props
}: ControlProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    let content;
    let notice = props.required ? '*' : '';

    if (isSelect(as, props)) {
        const { options, placeholder } = props;

        content = (
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder || "Select..."} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    } else if (isInput(as, props)) {
        const inputType =
            props.type === 'password' && showPassword ? 'text' : props.type;

        content = (
            <div className="relative tracking-tighter">
                <input
                    {...props}
                    type={inputType}
                    {...register(props.name as Path<Register>, {
                        required: props.required && 'This field is required',
                        ...registerOptions,
                    })}
                    className={`${error ? 'border-red-600' : 'border-[#CBD5E1]'
                        } border rounded-md h-12 outline-none px-4 text-neutral-dark-2 w-full pr-10`}
                />
                {props.type === 'password' && (
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </span>
                )}
            </div>
        );
    } else {
        content = (
            <textarea
                {...props}
                {...register(props.name as Path<Register>, {
                    required: props.required && 'This field is required',
                    ...registerOptions,
                })}
                className={`flex b-radius f-width ${props.className}`}
            />
        );
    }

    // Function to extract error message from FieldError
    const getErrorMessage = (error?: string | FieldError) => {
        if (typeof error === 'string') {
            return error;
        }
        if (error && typeof error.message === 'string') {
            return error.message;
        }
        return undefined;
    };

    return (
        <div
            onFocus={onContainerFocus}
            className={`flex flex-col gap-1 ${containerClass}`}
        >
            {labelText && (
                <div className="w-full flex justify-between">
                    <label htmlFor={props.name} className='trackin'>
                        {labelText}
                        {notice}
                    </label>
                </div>
            )}
            {content}
            {getErrorMessage(error) && (
                <span className="text-red-600 text-xs">
                    {getErrorMessage(error)}
                </span>
            )}
        </div>
    );
}
