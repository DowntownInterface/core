import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

class UseRipple {
    x = 0;
    y = 0;
    z = 0;

    findFurthestPoint(clickPointX: any, elementWidth: any, offsetX: any, clickPointY: any, elementHeight: any, offsetY: any) {
        this.x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
        this.y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
        this.z = Math.hypot(this.x - (clickPointX - offsetX), this.y - (clickPointY - offsetY));
        return this.z;
    }

    appyStyles(element: any, color: any, rect: any, radius: any, event: any) {
        element.classList.add("ripple");
        element.style.backgroundColor = color === "dark" ? "rgba(0,0,0, 0.2)" : "rgba(255,255,255, 0.3)";
        element.style.borderRadius = "50%";
        element.style.pointerEvents = "none";
        element.style.position = "absolute";
        element.style.left = event.clientX - rect.left - radius + "px";
        element.style.top = event.clientY - rect.top - radius + "px";
        element.style.width = element.style.height = radius * 2 + "px";
    }

    applyAnimation(element: any) {
        element.animate(
            [
                { transform: "scale(0)", opacity: 1 },
                { transform: "scale(1.5)", opacity: 0 }
            ],
            { duration: 500, easing: "linear" }
        );
    }

    create(event: any, color: any) {
        const element = event.currentTarget;
        element.style.position = "relative";
        element.style.overflow = "hidden";
        const rect = element.getBoundingClientRect();
        const radius = this.findFurthestPoint(
            event.clientX,
            element.offsetWidth,
            rect.left,
            event.clientY,
            element.offsetHeight,
            rect.top
        );

        const circle = document.createElement("span");
        this.appyStyles(circle, color, rect, radius, event);
        this.applyAnimation(circle);
        element.appendChild(circle);

        setTimeout(() => circle.remove(), 500);
    }
}

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
            ripple: {
                default: "button-ripple",
                on: "button-ripple",
                off: "",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            ripple: "default",
        },
    }
)
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ripple, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        const rripple = new UseRipple();

        const handleMouseUp = (event:any) => {
            const colorAttribute = event.currentTarget.getAttribute("data-ripple-color");
            const color = colorAttribute === "dark" ? "dark" : "light";
            rripple.create(event, color);
        };

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, ripple, className }))}
                ref={ref}
                {...props}
                onMouseUp={handleMouseUp}
            >
                {props.children}
            </Comp>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };