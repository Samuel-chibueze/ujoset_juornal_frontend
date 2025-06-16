
import { BookOpen, Award, Users, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4">About Academic Journal</h1>
              <p className="text-xl text-muted-foreground">
                Dedicated to advancing scholarly research and academic excellence through digital innovation
              </p>
            </div>
          </div>
        </section>

        {/* About UJOSET Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">About UJOSET</h2>
              <p>
                UNICROSS JOSET is a peer-reviewed journal of interdisciplinary research theories and observations. 
                It is a publication of UNICROSS, Calabar, Nigeria and is published twice a year – March and September. 
                The mission of this journal is to provide a platform for the formation, development and dissemination of 
                research across academic disciplines in Science, Engineering and Technology conducted both inside and outside the university. 
                Manuscripts are peer-reviewed by at least two experts in the area before inclusion in this journal and the Editorial 
                Board ensures that the highest standards are maintained.
              </p>
              <br />
              <p>
                UNICROSS JOSET will be competing with a number of existing journals, however, we firmly believe there is a niche for this new journal. 
                As we all know, any new venture takes time to develop its own character, but we are confident that this new journal will always attract 
                enough original research articles to enable it be judged a success. For now, we are in the traditional print format but in the near future, 
                we will go online.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
              <p>
                At UJOSET, our mission is simple: To provide a platform for the formation, development and dissemination of 
                research across academic disciplines in Science, Engineering and Technology conducted both inside and outside the university.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">What We Offer</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium">Peer-Reviewed Publications:</h4>
                  <p>We offer a rigorous peer-review process to ensure the quality and integrity of published research.</p>
                </div>
                <hr />
                <div>
                  <h4 className="text-lg font-medium">Wide Range of Disciplines:</h4>
                  <p>
                    From computer science to environmental engineering, UJOSET covers a broad spectrum of disciplines to accommodate diverse research interests.
                    <br />
                    <strong>Open Access:</strong> We believe in the principles of open access, making research freely accessible to anyone, anywhere, fostering greater global collaboration and knowledge dissemination.
                  </p>
                </div>
                <hr />
                <div>
                  <h4 className="text-lg font-medium">Community Engagement:</h4>
                  <p>
                    UJOSET is more than just a publishing platform; it's a community of researchers and scholars committed to advancing knowledge and driving positive change.
                  </p>
                </div>
                <hr />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-4 text-muted-foreground text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p>University of Cross River State, Ekpo Abasi, Calabar, Cross River State, Nigeria</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Phone No:</p>
                    <p>+234 706 0610 0748</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Email ID:</p>
                    <p>ujoset@unicross.edu.ng</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {[
                  {
                    icon: <Award className="h-6 w-6 text-primary" />,
                    title: "Excellence",
                    description: "Maintaining the highest standards of academic quality through rigorous peer review",
                  },
                  {
                    icon: <Users className="h-6 w-6 text-primary" />,
                    title: "Collaboration",
                    description: "Fostering connections between researchers worldwide",
                  },
                  {
                    icon: <Globe className="h-6 w-6 text-primary" />,
                    title: "Accessibility",
                    description: "Making research accessible to scholars around the world",
                  },
                  {
                    icon: <BookOpen className="h-6 w-6 text-primary" />,
                    title: "Innovation",
                    description: "Embracing digital solutions to enhance academic publishing",
                  },
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-primary/10">{value.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Our Editorial Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Ass. Prof. Peter Neji Amba", title: "Editor-in-Chief" },
                  { name: "Dr. Victor .E. Okpashi", title: "secretary" },
                  { name: "Prof. Eko J. Akpama", title: "Managing Editor" },
                ].map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
