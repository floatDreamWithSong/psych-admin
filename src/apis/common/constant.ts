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

export const GenderLabel = {
	[Gender.MALE]: "男",
	[Gender.FEMALE]: "女",
	[Gender.OTHER]: "其他",
} as const;
export type GenderLabel = (typeof GenderLabel)[keyof typeof GenderLabel];

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
	DANGER: 1,
	DEPRESS: 2,
	ANXIETY: 3,
	NEGATIVE: 4,
	NORMAL: 5,
} as const;
export type Emotion = (typeof Emotion)[keyof typeof Emotion];

export const EmotionLabel = {
	[Emotion.DANGER]: "危险",
	[Emotion.DEPRESS]: "抑郁",
	[Emotion.ANXIETY]: "焦虑",
	[Emotion.NEGATIVE]: "消极",
	[Emotion.NORMAL]: "正常",
} as const;
export type EmotionLabel = (typeof EmotionLabel)[keyof typeof EmotionLabel];

export const EmotionLevel = {
	UNKNOWN: 0,
	DANGER: 1,
	DEPRESS: 2,
	ANXIETY: 3,
	NEGATIVE: 4,
	NORMAL: 5,
} as const;
export type EmotionLevel = (typeof EmotionLevel)[keyof typeof EmotionLevel];

export const EmotionLevelLabel = {
	[EmotionLevel.UNKNOWN]: "未知",
	[EmotionLevel.DANGER]: "危险",
	[EmotionLevel.DEPRESS]: "抑郁",
	[EmotionLevel.ANXIETY]: "焦虑",
	[EmotionLevel.NEGATIVE]: "消极",
	[EmotionLevel.NORMAL]: "正常",
} as const;
export type EmotionLevelLabel =
	(typeof EmotionLevelLabel)[keyof typeof EmotionLevelLabel];

export const RiskGender = {
	ALL: 0,
	MALE: 1,
	FEMALE: 2,
} as const;
export type RiskGender = (typeof RiskGender)[keyof typeof RiskGender];

export const RiskLevel = {
	HIGH: 1,
	MEDIUM: 2,
	LOW: 3,
	NORMAL: 4,
} as const;
export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];

export const RiskLevelLabel = {
	[RiskLevel.HIGH]: "高风险",
	[RiskLevel.MEDIUM]: "中风险",
	[RiskLevel.LOW]: "低风险",
	[RiskLevel.NORMAL]: "正常",
} as const;
export type RiskLevelLabel =
	(typeof RiskLevelLabel)[keyof typeof RiskLevelLabel];

export const AlarmStudentStatus = {
	PENDING: 1,
	PROCESSED: 2,
};

// 单日内时长的分布 0-5，6-10，11-20，21-30，31-60，61-120, 120以上
export const ConversationDuration = {
	LT5: 1,
	LT10: 2,
	LT20: 3,
	LT30: 4,
	LT60: 5,
	LT120: 6,
	GT120: 7,
} as const;
export type ConversationDuration =
	(typeof ConversationDuration)[keyof typeof ConversationDuration];

export const getConversationDurationLabel = (key: ConversationDuration) => {
	switch (key) {
		case ConversationDuration.LT5:
			return "0-5";
		case ConversationDuration.LT10:
			return "6-10";
		case ConversationDuration.LT20:
			return "11-20";
		case ConversationDuration.LT30:
			return "21-30";
		case ConversationDuration.LT60:
			return "31-60";
		case ConversationDuration.LT120:
			return "61-120";
		case ConversationDuration.GT120:
			return "120+";
	}
};

// 1-2: Processed | Pending
export const ProcessStatus = {
	PROCESSED: 1,
	PENDING: 2,
} as const;
export type ProcessStatus = (typeof ProcessStatus)[keyof typeof ProcessStatus];

export const ProcessStatusLabel = {
	[ProcessStatus.PROCESSED]: "已处理",
	[ProcessStatus.PENDING]: "待处理",
} as const;
export type ProcessStatusLabel =
	(typeof ProcessStatusLabel)[keyof typeof ProcessStatusLabel];

export const GradeLabel = [
	"全部",
	"一年级",
	"二年级",
	"三年级",
	"四年级",
	"五年级",
	"六年级",
	"七年级",
	"八年级",
	"九年级",
] as const;
export type GradeLabel = (typeof GradeLabel)[number];

export const Grade = [0, 1, 2, 3, 4, 5, 6, 7] as const;
export type Grade = (typeof Grade)[number];

export const MessageRole = {
	SYSTEM: 1,
	ASSISTANT: 2,
	USER: 3,
	TOOL: 4,
} as const;
export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];
