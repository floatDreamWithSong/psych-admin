export const AuthCodeType = {
	PASSWORD: 1,
	VERIFY_CODE: 2,
} as const;
export type AuthCodeType = (typeof AuthCodeType)[keyof typeof AuthCodeType];

export const UserCodeType = {
	PHONE: 1,
	STUDENT_ID: 2,
} as const;
export type UserCodeType = (typeof UserCodeType)[keyof typeof UserCodeType];

export const Gender = {
	MALE: 1,
	FEMALE: 2,
	OTHER: 3,
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const Status = {
	ACTIVE: 1,
	DELETED: 2,
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export const Role = {
	STUDENT: 1,
	TEACHER: 2,
	CLASS_TEACHER: 3,
	UNIT_ADMIN: 4,
	SUPER_ADMIN: 5,
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const Emotion = {
	DANGER: "1",
	DEPRESS: "2",
	NEGATIVE: "3",
	NORMAL: "4",
} as const;
export type Emotion = (typeof Emotion)[keyof typeof Emotion];

export const RiskGender = {
	ALL: 0,
	MALE: 1,
	FEMALE: 2,
} as const;
export type RiskGender = (typeof RiskGender)[keyof typeof RiskGender];

export const RiskLevel = {
	NORMAL: 1,
	LOW: 2,
	MEDIUM: 3,
	HIGH: 4,
} as const;
export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];

export const AlarmStudentStatus = {
	PENDING: 1,
	PROCESSED: 2,
};
