export interface ServerConfig {
  protocol: ProtocolConfig;
  host: string;
  port: number;
  isSSL: boolean;
  runInHTTPS: boolean;
  options: any;
}

export interface ProtocolConfig {
  normal: string;
  secure: string;
}
