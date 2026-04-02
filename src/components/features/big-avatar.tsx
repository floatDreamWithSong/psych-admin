import { Gender } from "@/apis/common/constant";
import malePng from "@/assets/imgs/male.png";
import femalePng from "@/assets/imgs/female.png";

export default function BigAvatar({
	gender = Gender.MALE,
}: {
	gender?: Gender;
}) {
	return (
		<img
			src={gender === Gender.MALE ? malePng : femalePng}
			alt="avatar"
			width={188}
			height={188}
		/>
	);
}
