import { styles } from "@/styles/pdfStyles";
import { Experience } from "@/types";
import { View, Text } from "@react-pdf/renderer";

type ExperienceProps = {
  experience?: Experience[];
};

const ExperienceSection = ({ experience }: ExperienceProps) => (
  <View>
    {experience && experience.length > 0 && (
      <View>
        <Text style={styles.heading}>EXPERIENCE</Text>
        <View style={styles.line} />
        <View style={{ gap: 3 }}>
          {experience.map((item, index) => (
            <View key={index}>
              <View style={styles.smSpace}>
                <View style={styles.seperate}>
                  <Text>
                    <Text style={styles.bold}>{item.role},</Text>
                    <Text style={styles.italic}>{` ${item.company}`}</Text>
                    {` – ${item.location}`}
                  </Text>
                  <Text style={styles.italic}>
                    {item.endDate
                      ? `${item.startDate} - ${item.endDate}`
                      : `${item.endDate} - Present`}
                  </Text>
                </View>
                <View style={{ gap: 0 }}>
                  {item.bullets &&
                    item.bullets.map((bullet, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text>–</Text>
                        <Text style={styles.listText}>{bullet}</Text>
                      </View>
                    ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    )}
  </View>
);

export default ExperienceSection;
