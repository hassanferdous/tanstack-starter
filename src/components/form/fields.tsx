import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

type FormField<T> = {
	name: string;
	label: string;
	type: string;
	placeholder?: string;
	onChange?: (value: T) => void;
	required?: boolean;
	description?: string;
};
export const TextInput = ({ ...props }: FormField<string>) => {
	const { control } = useFormContext();
	return (
		<Controller
			name={props.name}
			control={control}
			render={({ field: { onChange, ...field }, fieldState }) => (
				<Field>
					{props.label && (
						<FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
					)}
					<Input
						id={props.name}
						type={props.type}
						placeholder={props.placeholder}
						onChange={(e) => {
							props.onChange?.(e.target.value);
							onChange(e.target.value);
						}}
						required={props.required}
						{...field}
					/>
					{props.description && (
						<FieldDescription>{props.description}</FieldDescription>
					)}
					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	);
};
