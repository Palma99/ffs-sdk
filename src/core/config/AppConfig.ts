type AppConfig = {
  baseUrl: string 
} 

export const getAppConfig = (): AppConfig => {
  return {
    baseUrl: import.meta.env.VITE_API_PUBLIC_URL
  }
}
