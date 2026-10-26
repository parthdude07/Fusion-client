import { lazy, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ModuleRoutes } from "../../ui/routing/ModuleRoutes";
import { pagesForRole } from "../../ui/nav/roles";
import {
  ACADEMIC_BASE,
  ACADEMIC_NOTIFICATION_SLUGS,
  ACADEMIC_PAGES,
} from "./pages";

const COMPONENTS = {
  adminStudentCourses: lazy(() => import("./StudentCourses")),
  adminVerifyRegistration: lazy(() => import("./VerifyStudentRegistration")),
  adminDeletePreRegistration: lazy(() => import("./DeletePreRegistration")),
  adminAllotCourses: lazy(() => import("./AllotCourses")),
  adminAllocateCourses: lazy(() => import("./AllocateCourses")),
  adminPreRegistrationReport: lazy(() => import("./PreRegistrationReport")),
  adminAddCourses: lazy(() => import("./AdminAddDashboard")),
  adminDropCourses: lazy(() => import("./AdminDropDashboard")),
  adminReplacement: lazy(() => import("./AdminReplacementDashboard")),
  adminSwayam: lazy(() => import("./AdminSwayamDashboard")),
  adminStudentDashboard: lazy(() => import("./AdminStudentDashboard")),
  adminGenerateStudentList: lazy(() => import("./GenerateStudentList")),
  adminSectionAssignment: lazy(() => import("./SectionAssignment")),
  adminBatchChange: lazy(() => import("./AdminBatchChange")),
  adminPromoteSemester: lazy(() => import("./AdminPromoteSemester")),
  adminAcademicCalendar: lazy(() => import("./AcademicCalendar")),
  adminSemesterTimetable: lazy(() => import("./AdminSemesterTimetable")),
  adminFeedbackView: lazy(() => import("./FeedbackForm/AdminFeedbackView")),
  adminPhdCourseRequests: lazy(() => import("./AdminPhDCourseRequests")),

  studentRegisteredCourses: lazy(() => import("./RegisteredCourses")),
  studentAvailableCourses: lazy(() => import("./AvailableCourses")),
  studentPreRegistration: lazy(() => import("./PreRegistration")),
  studentFinalRegistration: lazy(() => import("./FinalRegistration")),
  studentPhdCourseRegistration: lazy(() => import("./PhDCourseRegistration")),
  studentSwayam: lazy(() => import("./SwayamRegistrationWrapper")),
  studentAddDrop: lazy(() => import("./StudentAddDropReplace")),
  studentCalendar: lazy(() => import("./StudentCalendar")),
  studentFeedbackForm: lazy(
    () => import("./FeedbackForm/StudentCourseFeedbackForm"),
  ),
  studentTeachingCreditFeedback: lazy(() => import("./TeachingCreditFeedback")),

  adminFeeStructure: lazy(() => import("./FeeStructure")),
  facultyRollList: lazy(() => import("./ViewRollList")),
  facultyTaDashboard: lazy(() =>
    import("./Faculty_TA_Dashboard").then((m) => ({
      default: m.Faculty_TA_Dashboard,
    })),
  ),
  facultyCourseFeedback: lazy(
    () => import("./FeedbackForm/InstructorDashboard"),
  ),
};

export default function AcademicPage() {
  const role = useSelector((state) => state.user.role);
  const programmeType = useSelector((state) => state.user.programmeType);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pages = useMemo(
    () => pagesForRole(ACADEMIC_PAGES, role, { programmeType }),
    [role, programmeType],
  );

  const requestedTab = searchParams.get("tab");
  useEffect(() => {
    if (!requestedTab) return;
    const candidates = ACADEMIC_NOTIFICATION_SLUGS[requestedTab] ?? [];
    const target =
      pages.find((p) => candidates.includes(p.slug)) ??
      pages.find((p) => p.title.toLowerCase() === requestedTab.toLowerCase());
    if (target) navigate(`/academics/${target.slug}`, { replace: true });
  }, [requestedTab, pages, navigate]);

  return (
    <ModuleRoutes
      pages={pages}
      components={COMPONENTS}
      basePath={ACADEMIC_BASE}
      emptyMessage="No academic pages apply to your role."
    />
  );
}
