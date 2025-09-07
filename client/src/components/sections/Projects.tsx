import { styles } from "@/styles/pdfStyles";
import { Projects } from "@/types";
import { View, Text, Link } from "@react-pdf/renderer";

type ProjectProps = {
  projects?: Projects[];
};

const ProjectSection = ({ projects }: ProjectProps) => (
  <View>
    {projects && projects.length > 0 && projects.some((e) => e.active) && (
      <View>
        <Text style={styles.heading}>PROJECTS</Text>
        <View style={styles.line} />
        <View style={{ gap: 3 }}>
          {projects.map((item, index) => (
            <View key={index}>
              {item.active && (
                <View style={styles.smSpace}>
                  <View style={styles.seperate}>
                    <Text>
                      <Text style={styles.bold}>
                        {item.title} {item.stack && `|`}
                      </Text>
                      <Text style={styles.italic}>{` ${item.stack?.join(
                        ", "
                      ).trim()}`}</Text>
                    </Text>
                    {item.link ? (
                      <Link style={styles.italic} src={item.link}>
                        {item.link}
                      </Link>
                    ) : (
                      <Text> </Text>
                    )}
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
              )}
            </View>
          ))}
        </View>
      </View>
    )}
  </View>
);

export default ProjectSection;
