import { FC, HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { classNameHelper } from "@/lib/utils";

const headingVariants = cva(
	"text-black/95 dark:text-slate-200 text-center lg:text-left font-extrabold leading-tight tracking-tighter",
	{
		variants: {
			size: {
				default: "text-xl md:text-2xl lg:text-4xl",
				sm: "text-lg md:text-xl lg:text-2xl",
				lg: "text-2xl md:text-4xl lg:text-6xl",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
);

interface HeadingProps
	extends HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof headingVariants> {}

const Heading = forwardRef<HTMLParagraphElement, HeadingProps>(
	({ className, size, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				{...props}
				className={classNameHelper(headingVariants({ size, className }))}
			>
				{children}
			</p>
		);
	}
);

Heading.displayName = "Heading";
// ^^ used b/c of forwardRef & for debugging/etc

export default Heading;
