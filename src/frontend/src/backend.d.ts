import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeadCaptureRequest {
    name: string;
    jobSeeker: boolean;
    internInterest: boolean;
    phone: string;
    foundingInterest: boolean;
    investor: boolean;
}
export interface Entry {
    submitted: boolean;
    data: LeadCaptureRequest;
}
export interface backendInterface {
    createLeadCaptureRequest(email: string, name: string, phone: string, jobSeeker: boolean, foundingInterest: boolean, investor: boolean, internInterest: boolean): Promise<void>;
    getAllRequests(): Promise<Array<[string, Entry]>>;
    isSubmitted(email: string): Promise<boolean>;
}
