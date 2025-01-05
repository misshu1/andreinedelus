import type {FC, JSX} from "react";
import {Controller, useForm, type SubmitHandler} from "react-hook-form";
import styles from "./Contact.module.css";
import {zodResolver} from "@hookform/resolvers/zod";
import {
	defaultValues,
	validationSchema,
	type ValidationSchema,
} from "./validation-schema";
import TextField from "@components/inputs/TextField/TextField";
import classNames from "classnames";

type ContactProps = {
	children: JSX.Element;
};

const Contact: FC<ContactProps> = ({children}) => {
	const {
		control,
		handleSubmit,
		formState: {errors, isValid, isSubmitting},
	} = useForm<ValidationSchema>({
		defaultValues: defaultValues,
		resolver: zodResolver(validationSchema),
		mode: "all",
		reValidateMode: "onBlur",
	});

	const onSubmit: SubmitHandler<ValidationSchema> = data => {
		if (Object.keys(errors).length === 0) {
			console.log(data, errors);
		}
	};

	return (
		<section className={classNames(styles.container)}>
			<form
				className={classNames(styles.form)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2
					id="contactTitle"
					className={classNames(styles.title)}
					data-content="Contact"
				></h2>
				<div className={styles.inputContainer}>
					<Controller
						name="name"
						control={control}
						render={({
							field,
							fieldState: {invalid, isDirty, error},
						}) => (
							<TextField
								{...field}
								type="text"
								isInvalid={invalid}
								isValid={!invalid && isDirty}
								error={error?.message}
								label="Name"
							>
								{children}
							</TextField>
						)}
					/>
				</div>
				<div className={styles.inputContainer}>
					<Controller
						name="email"
						control={control}
						render={({
							field,
							fieldState: {invalid, isDirty, error},
						}) => (
							<TextField
								{...field}
								type="email"
								isInvalid={invalid}
								isValid={!invalid && isDirty}
								error={error?.message}
								label="Email"
							>
								{children}
							</TextField>
						)}
					/>
				</div>
				<div className={styles.inputContainer}>
					<Controller
						name="message"
						control={control}
						render={({
							field,
							fieldState: {invalid, isDirty, error},
						}) => (
							<TextField
								type="textarea"
								{...field}
								isInvalid={invalid}
								isValid={!invalid && isDirty}
								error={error?.message}
								label="Message"
							>
								{children}
							</TextField>
						)}
					/>
				</div>
				<button
					type="submit"
					aria-label="send message"
					disabled={!isValid || isSubmitting}
				>
					Send Message
				</button>
			</form>
		</section>
	);
};

export default Contact;
