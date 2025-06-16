
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#3B82F6',
					foreground: '#FFFFFF',
					50: '#EBF4FF',
					100: '#DBEAFE',
					500: '#3B82F6',
					600: '#2563EB',
					700: '#1D4ED8'
				},
				secondary: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF',
					50: '#ECFDF5',
					100: '#D1FAE5',
					500: '#10B981',
					600: '#059669'
				},
				accent: {
					DEFAULT: '#F59E0B',
					foreground: '#FFFFFF',
					50: '#FFFBEB',
					100: '#FEF3C7',
					500: '#F59E0B',
					600: '#D97706'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F8FAFC',
					foreground: '#64748B'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#0F172A'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#0F172A'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: '0.75rem',
				md: '0.5rem',
				sm: '0.375rem'
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
			},
			animation: {
				'fade-in': 'fadeIn 0.3s ease-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'scale-in': 'scaleIn 0.2s ease-out'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
