interface Config {
    exclude?: string | string[];
}
export declare const record: (apiKey: string, config?: Config) => (req: any, res: any, next: any) => Promise<void>;
export {};
