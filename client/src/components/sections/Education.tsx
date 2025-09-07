import { styles } from "@/styles/pdfStyles";
import { Education } from "@/types";
import { View, Text } from "@react-pdf/renderer";

type EducationProps = {
  education?: Education[];
};

const EducationSection = ({ education }: EducationProps) => (
  <View>
    {education && education.length > 0 && education.some((e) => e.active) && (
      <View>
        <Text style={styles.heading}>EDUCATION</Text>
        <View style={styles.line} />
        <View style={{ gap: 3 }}>
          {education.map((item, index) => (
            <View key={index}>
              {item.active && (
                <View style={styles.smSpace}>
                  <View style={styles.seperate}>
                    <Text style={styles.bold}>
                      {item.school}
                      {item.gpa && `, GPA: ${parseFloat(item.gpa.toString()).toFixed(2)}`}
                    </Text>
                    <Text>{item.location}</Text>
                  </View>
                  <View style={styles.seperate}>
                    <Text style={styles.italic}>{item.degree}</Text>
                    <Text style={styles.italic}>{item.gradDate}</Text>
                  </View>
                  <View style={{ gap: 0 }}>
                    {item.coursework && item.coursework.length > 0 && (
                      <View style={styles.listItem}>
                        <Text>–</Text>
                        <Text style={styles.listText}>
                          <Text style={styles.bold}>Relevant Coursework: </Text>
                          {item.coursework.join(", ")}
                        </Text>
                      </View>
                    )}

                    {item.involvement && item.involvement.length > 0 && (
                      <View style={styles.listItem}>
                        <Text>–</Text>
                        <Text style={styles.listText}>
                          <Text style={styles.bold}>Involvement: </Text>
                          {item.involvement.join(", ")}
                        </Text>
                      </View>
                    )}

                    {item.leadership && item.leadership.length > 0 && (
                      <View style={styles.listItem}>
                        <Text>–</Text>
                        <Text style={styles.listText}>
                          <Text style={styles.bold}>Leadership: </Text>
                          {item.leadership.join(", ")}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    )}
  </View>
);

export default EducationSection;
