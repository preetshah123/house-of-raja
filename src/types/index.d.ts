export interface FormData {
    email: string;
    name: string;
}
export interface FormState {
    email: string;
    name: string;
    loading: boolean;
    error: string | null;
    success: boolean;
}
export interface AppsScriptResponse {
    success: boolean;
    message: string;
}
export interface BackgroundLayerProps {
    children?: React.ReactNode;
}
export interface CloudLayerProps {
    children?: React.ReactNode;
}
export interface HeroSectionProps {
    children?: React.ReactNode;
}
export interface CastleSectionProps {
    children?: React.ReactNode;
}
export interface StickyLogoProps {
    imageUrl?: string;
    alt?: string;
}
export interface ScrollContainerProps {
    children: React.ReactNode;
}
export interface BottomBorderProps {
    imageUrl?: string;
    alt?: string;
}
export interface SignUpFormProps {
    onSubmit?: (data: FormData) => Promise<void>;
}
export interface UseFormSubmitReturn {
    submit: (data: FormData) => Promise<void>;
    loading: boolean;
    error: string | null;
    success: boolean;
    reset: () => void;
}
