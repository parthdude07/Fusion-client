import { describe, expect, it } from "vitest";

import { buildNavGroups } from "./navigation";
import { ICONS } from "../icons";

const ALL_MODULES = {
  course_registration: true,
  program_and_curriculum: true,
  examinations: true,
  thesis_research: true,
  database: true,
};

const linksOf = (groups) =>
  groups.flatMap((g) =>
    g.items.flatMap((item) => item.links ?? (item.to ? [item] : [])),
  );

const ROLES = [
  ["acadadmin", null],
  ["studentacadadmin", null],
  ["student", "UG"],
  ["student", "PG"],
  ["student", "PHD"],
  ["Professor", null],
  ["Assistant Professor", null],
  ["Associate Professor", null],
  ["Dean Academic", null],
  ["HOD (CSE)", null],
  ["Director", null],
];

describe("buildNavGroups", () => {
  it.each(ROLES)(
    "gives %s (%s) no duplicate destinations",
    (role, programme) => {
      const links = linksOf(
        buildNavGroups({
          role,
          accessibleModules: ALL_MODULES,
          programmeType: programme,
        }),
      );
      const targets = links.map((l) => l.to);
      expect(new Set(targets).size).toBe(targets.length);
    },
  );

  it.each(ROLES)("gives %s (%s) resolvable icons only", (role, programme) => {
    const groups = buildNavGroups({
      role,
      accessibleModules: ALL_MODULES,
      programmeType: programme,
    });
    const named = [
      ...groups.flatMap((g) => g.items.map((i) => i.icon)),
      ...linksOf(groups).map((l) => l.icon),
    ].filter(Boolean);
    named.forEach((icon) => expect(ICONS).toHaveProperty(icon));
  });

  it("keeps every acadadmin academic page reachable", () => {
    const groups = buildNavGroups({
      role: "acadadmin",
      accessibleModules: ALL_MODULES,
    });
    const academics = groups.find((g) => g.section === "Academics");

    expect(linksOf([academics])).toHaveLength(20);
    expect(academics.items.map((i) => i.label)).toEqual([
      "Registration",
      "Course Changes",
      "Student Records",
      "Calendar & Feedback",
      "Fee Structure",
    ]);
    const registration = academics.items.find(
      (item) => item.label === "Registration",
    );
    expect(registration.links.map((link) => link.label)).toEqual([
      "Student Courses",
      "Pre-Registration",
      "Delete Pre-Registration",
      "Verify Registration",
      "Allot Courses",
      "Allocate Courses",
    ]);
    expect(registration.links).toContainEqual(
      expect.objectContaining({
        label: "Pre-Registration",
        to: "/academics/pre-registration-report",
        icon: "ListChecks",
      }),
    );
    expect(registration.links).toHaveLength(6);
  });

  it("shows semester timetable only to roles accepted by its backend", () => {
    const timetablePath = "/academics/semester-timetable";
    const pathsFor = (role) =>
      linksOf(
        buildNavGroups({
          role,
          accessibleModules: ALL_MODULES,
        }),
      ).map((link) => link.to);

    expect(pathsFor("acadadmin")).toContain(timetablePath);
    expect(pathsFor("Dean Academic")).toContain(timetablePath);
    expect(pathsFor("studentacadadmin")).not.toContain(timetablePath);
    expect(pathsFor("Acad UG")).not.toContain(timetablePath);
  });

  it("swaps the UG registration pipeline for the research one", () => {
    const slugsFor = (programmeType) =>
      linksOf(
        buildNavGroups({
          role: "student",
          accessibleModules: ALL_MODULES,
          programmeType,
        }),
      ).map((l) => l.to);

    expect(slugsFor("UG")).toContain("/academics/pre-registration");
    expect(slugsFor("UG")).not.toContain(
      "/academics/thesis-course-registration",
    );
    expect(slugsFor("PHD")).toContain("/academics/thesis-course-registration");
    expect(slugsFor("PHD")).not.toContain("/academics/pre-registration");
  });

  it("hides a module the role has no access to", () => {
    const groups = buildNavGroups({
      role: "acadadmin",
      accessibleModules: { course_registration: true },
    });
    expect(groups.map((g) => g.section)).not.toContain("Examination");
    expect(groups.map((g) => g.section)).toContain("Academics");
  });

  it("shows the certificate pages only to acadadmin", () => {
    const acadadmin = buildNavGroups({
      role: "acadadmin",
      accessibleModules: ALL_MODULES,
    });
    const certificate = acadadmin.find(
      (group) => group.section === "Certificate",
    );

    // One expandable holding every certificate, as Registration does.
    expect(certificate.items).toEqual([
      expect.objectContaining({
        label: "Certificates",
        links: [
          expect.objectContaining({
            label: "Bonafide Certificate",
            to: "/certificates/bonafide-certificate",
          }),
          expect.objectContaining({
            label: "Paid / Unpaid Certificate",
            to: "/certificates/fee-certificate",
          }),
          expect.objectContaining({
            label: "Demand Letter",
            to: "/certificates/demand-letter",
          }),
          expect.objectContaining({
            label: "Fee Structure Certificate",
            to: "/certificates/fee-structure-certificate",
          }),
        ],
      }),
    ]);

    const studentAdmin = buildNavGroups({
      role: "studentacadadmin",
      accessibleModules: ALL_MODULES,
    });
    expect(studentAdmin.some((group) => group.section === "Certificate")).toBe(
      false,
    );
  });

  it("always offers the dashboard", () => {
    const groups = buildNavGroups({ role: "Guest-User" });
    expect(linksOf(groups).map((l) => l.to)).toContain("/dashboard");
  });

  it("ignores a module the backend grants but the frontend does not build", () => {
    const groups = buildNavGroups({
      role: "student",
      accessibleModules: {
        visitor_hostel: true,
        gymkhana: true,
        database: true,
      },
      programmeType: "UG",
    });
    const modules = groups.find((g) => g.section === "Modules").items;
    expect(modules.map((i) => i.code)).toEqual(["database"]);
  });

  it.each(ROLES)(
    "gives %s (%s) only links that go somewhere",
    (role, programme) => {
      const links = linksOf(
        buildNavGroups({
          role,
          accessibleModules: ALL_MODULES,
          programmeType: programme,
        }),
      );
      links.forEach((l) => {
        expect(typeof l.to).toBe("string");
        expect(l.to.startsWith("/")).toBe(true);
        expect(l.to).not.toBe("/");
      });
    },
  );

  it("puts Examination straight after Academics for a student", () => {
    const sections = buildNavGroups({
      role: "student",
      accessibleModules: ALL_MODULES,
      programmeType: "UG",
    }).map((g) => g.section);

    expect(sections.indexOf("Examination")).toBe(
      sections.indexOf("Academics") + 1,
    );
    expect(sections.indexOf("Examination")).toBeLessThan(
      sections.indexOf("Program & Curriculum"),
    );
  });

  it("keeps the original section order for other roles", () => {
    const sections = buildNavGroups({
      role: "acadadmin",
      accessibleModules: ALL_MODULES,
    }).map((g) => g.section);

    expect(sections.indexOf("Program & Curriculum")).toBeLessThan(
      sections.indexOf("Examination"),
    );
  });

  it.each(ROLES)(
    "gives %s (%s) no group holding one link",
    (role, programme) => {
      const groups = buildNavGroups({
        role,
        accessibleModules: ALL_MODULES,
        programmeType: programme,
      });
      const lonely = groups.flatMap((g) =>
        g.items
          .filter((i) => i.links && i.links.length < 2)
          .map((i) => i.label),
      );
      expect(lonely).toEqual([]);
    },
  );

  it("turns a one-page group into a direct link keeping the group label", () => {
    const exam = buildNavGroups({
      role: "student",
      accessibleModules: ALL_MODULES,
      programmeType: "UG",
    }).find((g) => g.section === "Examination");

    expect(exam.items).toHaveLength(1);
    expect(exam.items[0].label).toBe("Results");
    expect(exam.items[0].to).toBe("/examination/result");
    expect(exam.items[0].links).toBeUndefined();
  });

  it("names the acadadmin result announcement link explicitly", () => {
    const exam = buildNavGroups({
      role: "acadadmin",
      accessibleModules: ALL_MODULES,
    }).find((g) => g.section === "Examination");
    const announceResult = exam.items.find(
      (item) => item.to === "/examination/result-announcement",
    );

    expect(announceResult.label).toBe("Announce Result");
  });

  it("offers no sidebar profile link, since the footer opens it", () => {
    const groups = buildNavGroups({
      role: "student",
      accessibleModules: ALL_MODULES,
      programmeType: "UG",
    });
    expect(groups.some((g) => g.section === "Account")).toBe(false);
    expect(linksOf(groups).map((l) => l.to)).not.toContain("/profile");
  });
});

describe("label collisions", () => {
  const EVERY_ROLE = [
    "acadadmin",
    "studentacadadmin",
    "Acad UG",
    "Acad PG",
    "Acad Ph.D.",
    "Professor",
    "Dean Academic",
    "HOD*",
    "student",
  ];
  const EVERY_MODULE = {
    course_registration: true,
    program_and_curriculum: true,
    examinations: true,
    thesis_research: true,
    database: true,
  };

  const collisions = (role, programmeType) => {
    const found = [];
    buildNavGroups({
      role,
      accessibleModules: EVERY_MODULE,
      programmeType,
    }).forEach((section) => {
      section.items.forEach((item) => {
        (item.links ?? []).forEach((link) => {
          if (link.label === item.label)
            found.push(`${role}/${section.section}: ${item.label}`);
        });
        if (item.label === section.section)
          found.push(`${role}: item repeats its section "${section.section}"`);
      });
    });
    return found;
  };

  it.each(EVERY_ROLE)(
    "no group repeats its own child's label for %s",
    (role) => {
      expect(collisions(role, "UG")).toEqual([]);
      expect(collisions(role, "PG")).toEqual([]);
    },
  );
});

describe("department staff", () => {
  it("sees only Home and Assistantship, whatever modules are enabled", () => {
    const groups = buildNavGroups({
      role: "CSE Staff",
      accessibleModules: {
        course_registration: true,
        examinations: true,
        database: true,
      },
    });
    expect(groups.map((g) => g.section)).toEqual(["Overview", "Scholarship"]);
    expect(groups[1].items.map((i) => i.label)).toEqual(["Assistantship"]);
    expect(groups[1].items[0].to).toBe("/scholarship/assistantship");
  });

  it("does not show Assistantship to anyone else", () => {
    const groups = buildNavGroups({
      role: "acadadmin",
      accessibleModules: { database: true },
    });
    const labels = groups.flatMap((g) => g.items.map((i) => i.label));
    expect(labels).not.toContain("Assistantship");
  });
});

describe("modules served by another Fusion app", () => {
  it("shows Placement Cell only when the IAM granted it", () => {
    const withIt = buildNavGroups({
      role: "student",
      accessibleModules: { placement_cell: true },
    });
    expect(withIt.map((g) => g.section)).toContain("Placement");

    const without = buildNavGroups({ role: "student", accessibleModules: {} });
    expect(without.map((g) => g.section)).not.toContain("Placement");
  });

  it("routes inside this shell, so the sidebar never changes", () => {
    const groups = buildNavGroups({
      role: "faculty",
      accessibleModules: { leave: true },
    });
    const leave = groups.find((g) => g.section === "Leave").items[0];
    expect(leave.to).toBe("/leave");
  });
});

describe("a plugged module's own screens", () => {
  const plugged = [
    {
      section: "Placement",
      items: [
        {
          code: "placement_cell",
          label: "Placement Cell",
          icon: "Briefcase",
          links: [
            {
              code: "p.postings",
              label: "Opportunities",
              icon: "ClipboardText",
              to: "/placement/postings",
            },
            {
              code: "p.offers",
              label: "My Offers",
              icon: "Signature",
              to: "/placement/offers",
            },
          ],
        },
      ],
    },
  ];

  it("expands into the screens the other service sent", () => {
    const groups = buildNavGroups({
      role: "student",
      accessibleModules: { placement_cell: true },
      pluggedNavigation: plugged,
    });
    const item = groups.find((g) => g.section === "Placement").items[0];
    expect(item.links.map((l) => l.label)).toEqual([
      "Opportunities",
      "My Offers",
    ]);
  });

  it("stays a single link when the service sent no menu", () => {
    const groups = buildNavGroups({
      role: "student",
      accessibleModules: { placement_cell: true },
    });
    const item = groups.find((g) => g.section === "Placement").items[0];
    expect(item.to).toBe("/placement");
    expect(item.links).toBeUndefined();
  });
});
