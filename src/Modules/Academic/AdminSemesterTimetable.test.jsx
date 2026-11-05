import { MantineProvider } from "@mantine/core";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TimetableGrid } from "./AdminSemesterTimetable";

const slot = (overrides) => ({
  id: 1,
  day: 1,
  start_time: "09:00",
  slot_type: "Lecture",
  course_code: "CS101",
  classroom: "L101",
  branch: "CSE",
  faculty: "Ada Lovelace",
  is_locked: false,
  ...overrides,
});

const renderGrid = (slots) =>
  render(
    <MantineProvider>
      <TimetableGrid slots={slots} />
    </MantineProvider>,
  );

describe("TimetableGrid", () => {
  it("keeps parallel classes in the same day/hour cell", () => {
    renderGrid([
      slot({ id: 1, course_code: "CS101" }),
      slot({ id: 2, course_code: "EC101", branch: "ECE" }),
    ]);

    const cell = screen.getByText("CS101").closest("td");
    expect(within(cell).getByText("CS101")).toBeInTheDocument();
    expect(within(cell).getByText("EC101")).toBeInTheDocument();
  });

  it("places lunch between the 12:00 and 14:00 rows", () => {
    const { container } = renderGrid([slot({})]);
    const rows = [...container.querySelectorAll("tbody tr")].map(
      (row) => row.textContent,
    );
    const noon = rows.findIndex((row) => row.includes("12:00"));
    const lunch = rows.findIndex((row) => row.includes("Lunch Break"));
    const afternoon = rows.findIndex(
      (row) => row.includes("14:00") && !row.includes("Lunch Break"),
    );

    expect(noon).toBeLessThan(lunch);
    expect(lunch).toBeLessThan(afternoon);
  });
});
