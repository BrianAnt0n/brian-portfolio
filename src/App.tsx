import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function App() {
  const { scrollYProgress } = useScroll(); // ✅ FIXED

  const [repos, setRepos] = useState<any[]>([]);

useEffect(() => {
  fetch("https://api.github.com/users/BrianAnt0n/repos")
    .then((res) => res.json())
    .then((data) => {
      const filtered = data
        .filter((repo: any) =>
          !repo.fork &&                 // remove forks
          repo.name !== "BrianAnt0n" && // remove profile README repo
          !repo.private &&              // remove private
          repo.description             // only repos with description
        )
        .sort((a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        .slice(0, 6);

      setRepos(filtered);
    });
}, []);


  return (
    <div className="bg-black text-white min-h-screen scroll-smooth">

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full flex justify-center gap-6 p-4 bg-black/50 backdrop-blur z-40 text-sm">
        <a href="#home" className="hover:text-gray-400 transition">Home</a>
        <a href="#about" className="hover:text-gray-400 transition">About</a>
        <a href="#projects" className="hover:text-gray-400 transition">Projects</a>
        <a href="#contact" className="hover:text-gray-400 transition">Contact</a>
      </nav>

      {/* HERO */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 pt-16">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Brian Aniceto
          <motion.p className="mt-2 text-sm text-gray-500">
  Building real-world systems, one project at a time.
</motion.p>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-400 text-lg max-w-xl"
        >
          IT Graduate • Flutter Developer • IoT Builder
        </motion.p>

        {/* OPTIONAL PHOTO */}
        <motion.img
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          src={`${import.meta.env.BASE_URL}profile.png`}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mt-8 border border-gray-700"
        />
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="px-6 md:px-20 py-20 max-w-3xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-6">About Me</h2>

        <p className="text-gray-400 leading-relaxed">
          I'm a passionate IT student from Quezon City University, specializing in
          mobile app development and backend systems. I love building impactful tech —
          from smart systems to practical utilities. I am always eager to learn and
          continuously improve my skills in this field.
        </p>
        <a
  href="https://github.com/BrianAnt0n"
  target="_blank"
  className="mt-4 text-sm text-gray-500 underline hover:text-gray-300 transition"
>
  View my full developer profile →
</a>
      </motion.section>

      

      {/* SKILLS */}
      <motion.section
        className="px-6 md:px-20 py-20 max-w-4xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-8">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "Flutter",
            "Dart",
            "Supabase",
            "PHP",
            "MySQL",
            "Arduino",
            "REST APIs",
            "Git",
            "Firebase",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="px-6 md:px-20 py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-10">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">

          <motion.a
            href="https://github.com/BrianAnt0n/CapstoneApp"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-6 rounded-2xl block border border-gray-800 transition duration-300 hover:scale-105 hover:border-gray-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          >
            <h3 className="text-xl font-bold">
              📱 E-ComposThink App
            </h3>
            <p className="text-gray-400 mt-2">
              Smart compost + sensor monitoring system with real-time data tracking.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Flutter • Supabase • IoT
            </p>
          </motion.a>

          <motion.a
            href="https://brianant0n.github.io/OJT-Attendance-Monitoring-Using-QR-Code-Project/#/test"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-6 rounded-2xl block border border-gray-800 transition duration-300 hover:scale-105 hover:border-gray-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          >
            <h3 className="text-xl font-bold">
              ⏱️ OJT Attendance System
            </h3>
            <p className="text-gray-400 mt-2">
              QR-based attendance system with backend integration.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Flutter • PHP • MySQL
            </p>
          </motion.a>

        </div>
      </motion.section>

      {/* REPOS */}
      <motion.section
  className="px-6 md:px-20 py-20"
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  <h2 className="text-2xl font-semibold mb-8 text-gray-300">
    Other Projects
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {repos.map((repo) => (
      <motion.a
        key={repo.id}
        href={repo.html_url}
        target="_blank"
        whileHover={{ scale: 1.05 }}
        className="bg-gray-900 p-5 rounded-xl border border-gray-800 transition duration-300 hover:border-gray-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        <h3 className="text-sm font-semibold">
          {repo.name}
        </h3>

        <p className="text-xs text-gray-400 mt-2 line-clamp-3">
          {repo.description || "No description"}
        </p>
      </motion.a>
    ))}

  </div>
</motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="px-6 md:px-20 py-20 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-6">Contact</h2>

        <p className="text-gray-400 mb-4">
          Open for opportunities, collaborations, or freelance work.
        </p>

        <div className="flex justify-center gap-6 text-sm">
          <a
            href="https://github.com/BrianAnt0n"
            target="_blank"
            className="hover:text-gray-300 underline"
          >
            GitHub
          </a>

          <a
            href="mailto:your-email@example.com"
            className="hover:text-gray-300 underline"
          >
            Email
          </a>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="text-center text-gray-600 pb-6 text-sm">
        © {new Date().getFullYear()} Brian Aniceto
      </footer>

    </div>
  );
}