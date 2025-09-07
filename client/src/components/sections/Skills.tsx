import { styles } from "@/styles/pdfStyles";
import { Skills } from "@/types";
import { View, Text } from "@react-pdf/renderer";

type SkillProps = {
  skills?: Skills;
};

const SkillsSection = ({ skills }: SkillProps) => (
  <View>
    {skills &&
      ((skills.languages && skills.languages.length > 0) ||
        (skills.technical && skills.technical.length > 0) ||
        (skills.web && skills.web.length > 0) ||
        (skills.other && skills.other.length > 0) ||
        (skills.interests && skills.interests.length > 0)) && (
        <View>
          <Text style={styles.heading}>
            {skills.interests && skills.interests.length > 0
              ? `SKILLS & INTERESTS`
              : `SKILLS`}
          </Text>
          <View style={styles.line} />
          <View style={{ gap: 3 }}>

            {skills.languages && skills.languages.length > 0 && (
              <View>
                <Text style={styles.interestText}>
                  <Text style={styles.bold}>Languages: </Text>
                  {skills.languages.join(", ").trim()}
                </Text>
              </View>
            )}

            {skills.technical && skills.technical.length > 0 && (
              <View>
                <Text style={styles.interestText}>
                  <Text style={styles.bold}>Technical: </Text>
                  {skills.technical.join(", ").trim()}
                </Text>
              </View>
            )}

            {skills.web && skills.web.length > 0 && (
              <View>
                <Text style={styles.interestText}>
                  <Text style={styles.bold}>Web Dev: </Text>
                  {skills.web.join(", ").trim()}
                </Text>
              </View>
            )}

            {skills.interests && skills.interests.length > 0 && (
              <View>
                <Text style={styles.interestText}>
                  <Text style={styles.bold}>Interests: </Text>
                  {skills.interests.join(", ").trim()}
                </Text>
              </View>
            )}

            {skills.other && skills.other.length > 0 && (
              <View>
                <Text style={styles.interestText}>
                  <Text style={styles.bold}>Other: </Text>
                  {skills.other.join(", ").trim()}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
  </View>
);

export default SkillsSection;
