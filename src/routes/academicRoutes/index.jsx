import { host, dynamicApiHost } from "../globalRoutes";

export const calendarRoute = `${host}/aims/api/calendar/`;
export const editCalendarRoute = `${host}/aims/api/calendar/update/`;
export const addCalendarRoute = `${host}/aims/api/calendar/add/`;
export const deleteCalendarRoute = `${host}/aims/api/calendar/delete/`;
export const clearCalendarRoute = `${host}/aims/api/calendar/clear/`;
export const exportCalendarRoute = `${host}/aims/api/calendar/export/`;
export const importCalendarRoute = `${host}/aims/api/calendar/import/`;
export const studentCalenderRoute = `${host}/academic-procedures/api/stu/calendar/student`;
export const nextSemCoursesRoute = `${host}/academic-procedures/api/stu/next_sem_courses/`;
export const currentCourseRegistrationRoute = `${host}/academic-procedures/api/stu/current_courseregistration`;
export const preCourseRegistrationRoute = `${host}/academic-procedures/api/stu/preregistration/`;
export const preCourseRegistrationSubmitRoute = `${host}/academic-procedures/api/stu/preregistration/submit/`;
export const swayamRegistrationRoute = `${host}/academic-procedures/api/stu/swayam_courses/`;
export const swayamRegistrationSubmitRoute = `${host}/academic-procedures/api/stu/swayam/submit/`;
export const swayamAvailabilityRoute = `${host}/academic-procedures/api/stu/swayam/availability/`;
export const swayamReplaceCheckRoute = `${host}/academic-procedures/api/stu/swayam/replace/check/`;
export const swayamReplaceSlotsRoute = `${host}/academic-procedures/api/stu/swayam/replace/slots/`;
export const swayamReplaceCoursesRoute = `${host}/academic-procedures/api/stu/swayam/replace/courses/`;
export const swayamTargetSlotsRoute = `${host}/academic-procedures/api/stu/swayam/target/slots/`;
export const swayamTargetCoursesRoute = `${host}/academic-procedures/api/stu/swayam/target/courses/`;
export const swayamCurrentCoursesRoute = `${host}/academic-procedures/api/stu/swayam/current/courses/`;
export const swayamReplaceSubmitRoute = `${host}/academic-procedures/api/stu/swayam/replace/submit/`;
export const studentSwayamRequestsRoute = `${host}/academic-procedures/api/stu/swayam/requests/`;
export const adminSwayamListRequestsRoute = `${host}/academic-procedures/api/acad/swayam/requests/`;
export const adminSwayamApproveRoute = `${host}/academic-procedures/api/acad/swayam/approve/`;
export const adminSwayamRejectRoute = `${host}/academic-procedures/api/acad/swayam/reject/`;
export const adminSwayamRevertRoute = `${host}/academic-procedures/api/acad/swayam/revert/`;
export const adminSwayamDeleteRoute = `${host}/academic-procedures/api/acad/swayam/delete/`;
export const finalRegistrationPageRoute = `${host}/academic-procedures/api/stu/finalregistrationpage/`;
export const finalRegistrationRoute = `${host}/academic-procedures/api/stu/final_registration/`;
export const studentListRoute = `${host}/academic-procedures/api/acad/student_list/`;
export const courseListRoute = `${host}/academic-procedures/api/acad/course_list/`;
export const verifyRegistrationRoute = `${host}/academic-procedures/api/acad/verify_registration/`;
export const batchesRoute = `${host}/programme_curriculum/api/admin_batches/`;
export const bonafideStudentRoute = `${host}/academic-procedures/api/acad/bonafide/student/`;
export const bonafidePdfRoute = `${host}/academic-procedures/api/acad/bonafide/pdf/`;
export const bonafideCertificatesRoute = `${host}/academic-procedures/api/acad/bonafide/certificates/`;
export const bonafideCertificatePdfRoute = (certificateId) =>
  `${bonafideCertificatesRoute}${certificateId}/pdf/`;

export const feeCertificateStudentRoute = `${host}/academic-procedures/api/acad/fee-certificate/student/`;
export const feeCertificatePdfRoute = `${host}/academic-procedures/api/acad/fee-certificate/pdf/`;
export const feeCertificatesRoute = `${host}/academic-procedures/api/acad/fee-certificate/certificates/`;
export const feeCertificateHistoryPdfRoute = (certificateId) =>
  `${feeCertificatesRoute}${certificateId}/pdf/`;

export const demandLetterStudentRoute = `${host}/academic-procedures/api/acad/demand-letter/student/`;
export const demandLetterPdfRoute = `${host}/academic-procedures/api/acad/demand-letter/pdf/`;
export const demandLettersRoute = `${host}/academic-procedures/api/acad/demand-letter/certificates/`;
export const demandLetterHistoryPdfRoute = (certificateId) =>
  `${demandLettersRoute}${certificateId}/pdf/`;

export const feeStructureCertificateStudentRoute = `${host}/academic-procedures/api/acad/fee-structure-certificate/student/`;
export const feeStructureCertificatePdfRoute = `${host}/academic-procedures/api/acad/fee-structure-certificate/pdf/`;
export const feeStructureCertificatesRoute = `${host}/academic-procedures/api/acad/fee-structure-certificate/certificates/`;
export const feeStructureCertificateHistoryPdfRoute = (certificateId) =>
  `${feeStructureCertificatesRoute}${certificateId}/pdf/`;

export const feeStructuresRoute = `${host}/academic-procedures/api/acad/fee-structures/`;
export const feeStructureTemplateRoute = `${feeStructuresRoute}template/`;
export const feeStructureDetailRoute = (structureId) =>
  `${feeStructuresRoute}${structureId}/`;
export const feeStructureReplicateRoute = (structureId) =>
  `${feeStructuresRoute}${structureId}/replicate/`;
export const demandLetterBankAccountsRoute = `${host}/academic-procedures/api/acad/demand-letter-bank-accounts/`;
export const checkAllocationRoute = `${host}/aims/api/check-allocation`;
export const startAllocationRoute = `${host}/aims/api/start-allocation`;
export const addCourseToSlotsRoute = `${host}/aims/api/add-course-to-slots`;
export const allocationResultsRoute = `${host}/aims/api/allocation-results`;
export const exportAllocationCourseRoute = `${host}/aims/api/allocation-results/export`;
export const exportAllAllocationCoursesRoute = `${host}/aims/api/allocation-results/export-all`;
export const getStudentCourseRoute = `${host}/academic-procedures/api/acad/verify_course/`;
export const dropStudentCourseRoute = `${host}/academic-procedures/api/acad/verify_course/drop/`;
export const addStudentCourseRoute = `${host}/academic-procedures/api/acad/addCourse/`;
export const addStudentThesisRoute = `${host}/academic-procedures/api/acad/add_thesis/`;
export const addStudentProgressSeminarRoute = `${host}/academic-procedures/api/acad/add_progress_seminar/`;
export const addStudentTeachingCreditRoute = `${host}/academic-procedures/api/acad/add_teaching_credit/`;
export const getThesisSlotsRoute = `${host}/academic-procedures/api/acad/get_thesis_slots/`;
export const getThesisCoursesRoute = `${host}/academic-procedures/api/acad/get_thesis_courses/`;
export const getProgressSeminarSlotsRoute = `${host}/academic-procedures/api/acad/get_progress_seminar_slots/`;
export const getProgressSeminarCoursesRoute = `${host}/academic-procedures/api/acad/get_progress_seminar_courses/`;
export const getTeachingCreditSlotsRoute = `${host}/academic-procedures/api/acad/get_teaching_credit_slots/`;
export const getTeachingCreditCoursesRoute = `${host}/academic-procedures/api/acad/get_teaching_credit_courses/`;
export const generatexlsheet = `${host}/aims/api/generatexlsheet`;
export const exportAllCoursesZipRoute = `${host}/aims/api/export-all-courses-zip/`;
export const availableCoursesRoute = `${host}/aims/api/available-courses`;
export const databaseFiltersRoute = `${host}/aims/api/database/filters/`;
export const databaseCourseRegistrationsRoute = `${host}/aims/api/database/course-registrations/`;
export const databaseBacklogRegistrationsRoute = `${host}/aims/api/database/backlog-registrations/`;
export const databaseStudentCreditTotalsRoute = `${host}/aims/api/database/student-credit-totals/`;
export const databaseCourseRegistrationCountsRoute = `${host}/aims/api/database/course-registration-counts/`;
export const databaseSwayamRegistrationsRoute = `${host}/aims/api/database/swayam-registrations/`;
export const databaseSemesterRegistrationsRoute = `${host}/aims/api/database/semester-registrations/`;
export const academicProceduresFaculty = `${host}/academic-procedures/api/fac/academic_procedures_faculty`;
export const getAllCourses = `${host}/academic-procedures/api/acad/get_all_courses`;
export const generateprereport = `${host}/aims/api/generate_preregistration_report/`;
export const searchPreRegistrationRoute = `${host}/academic-procedures/api/acad/search_preregistration/`;
export const deletePreRegistrationRoute = `${host}/academic-procedures/api/acad/delete_preregistration/`;
export const allotCoursesRoute = `${host}/academic-procedures/api/acad/allot_courses/`;
export const allotThesisRoute = `${host}/academic-procedures/api/acad/allot_thesis/`;
export const allotProgressSeminarRoute = `${host}/academic-procedures/api/acad/allot_progress_seminar/`;
export const allotTeachingCreditRoute = `${host}/academic-procedures/api/acad/allot_teaching_credit/`;
export const getCourseSlotsRoute = `${host}/academic-procedures/api/acad/get_add_course_slots/`;
export const getCoursesRoute = `${host}/academic-procedures/api/acad/get_add_courses/`;
export const editStudentCourseRoute =
  "/academic-procedures/api/editcourseadmin/";
export const getSingleCourseRoute = "/academic-procedures/api/studentcourse/";
export const semesterOptionsRoute = `${host}/academic-procedures/api/stu/course_reg/semesters/`;

// HOD
export const HOD_STUDENTS_URL = `${host}/academic-procedures/api/hod/students/?role=hod`;
export const HOD_ASSIGN_MANUAL_URL = `${host}/academic-procedures/api/hod/assign/`;
export const HOD_UPLOAD_EXCEL_URL = `${host}/academic-procedures/api/hod/assign/upload-excel/`;
export const HOD_PENDING_URL = `${host}/academic-procedures/api/hod/pending/?role=hod`;
export const HOD_APPROVED_URL = `${host}/academic-procedures/api/hod/approved/?role=hod`;
export const HOD_APPROVE_URL = (id) =>
  `${host}/academic-procedures/api/hod/approve/${id}/`;

// Faculty
export const FAC_ASSIGNMENTS_URL = `${host}/academic-procedures/api/faculty/assignments/?role=faculty`;
export const FAC_PENDING_URL = `${host}/academic-procedures/api/faculty/pending/?role=faculty`;
export const FAC_APPROVED_URL = `${host}/academic-procedures/api/faculty/approved/?role=faculty`;
export const FAC_APPROVE_URL = (id) =>
  `${host}/academic-procedures/api/faculty/approve/${id}/`;

// TA
export const TA_STIPENDS_URL = `${host}/academic-procedures/api/ta/stipends/?role=ta`;

// Aux
export const TA_LIST_URL = `${host}/academic-procedures/api/tas/`;
export const FACULTY_LIST_URL = `${host}/academic-procedures/api/faculties/`;

export const studentRegisteredSlotsRoute = `${host}/academic-procedures/api/stu/registered-slots/`;
export const studentBatchCreateRoute = `${host}/academic-procedures/api/stu/batch-create/`;
export const studentListRequestsRoute = `${host}/academic-procedures/api/stu/replacement-requests/`;

export const adminListRequestsRoute = `${host}/academic-procedures/api/acad/replacement-requests/`;
export const allotReplacementCoursesRoute = `${host}/academic-procedures/api/acad/change-requests/allocate_all/`;
export const revertReplacementRequestsRoute = `${host}/academic-procedures/api/acad/replacement-requests/revert/`;
export const deleteReplacementRequestsRoute = `${host}/academic-procedures/api/acad/replacement-requests/delete/`;
export const adminPendingCountsRoute = `${host}/academic-procedures/api/acad/pending-counts/`;
export const adminListDropRequestsRoute = `${host}/academic-procedures/api/acad/drop-requests/`;
export const approveDropRequestsRoute = `${host}/academic-procedures/api/acad/drop-requests/approve/`;
export const deleteDropRequestsRoute = `${host}/academic-procedures/api/acad/drop-requests/delete/`;

export const adminListAddRequestsRoute = `${host}/academic-procedures/api/acad/add-requests/`;
export const approveAddRequestsRoute = `${host}/academic-procedures/api/acad/add-requests/approve/`;
export const deleteAddRequestsRoute = `${host}/academic-procedures/api/acad/add-requests/delete/`;

export const studentDropRegistrationsRoute = `${host}/academic-procedures/api/stu/registrations_drop/`;
export const studentDropCourseRoute = `${host}/academic-procedures/api/stu/drop-course/`;
export const studentDropRequestsRoute = `${host}/academic-procedures/api/stu/drop-requests/`;
export const studentAvailableAddCourseSlotsRoute = `${host}/academic-procedures/api/stu/add_course_slots/`;
export const studentAvailableAddCoursesRoute = `${host}/academic-procedures/api/stu/add_course_courses/`;
export const studentAddCourseRoute = `${host}/academic-procedures/api/stu/add_course/`;
export const studentAddRequestsRoute = `${host}/academic-procedures/api/stu/add-requests/`;

export const StudentSearchRoute = `${host}/academic-procedures/api/acad/student-search/`;

export const studentQuestionsRoute = `${host}/academic-procedures/api/stu/feedback_questions/`;
export const studentSubmitRoute = `${host}/academic-procedures/api/stu/feedback_submit/`;

export const instCoursesRoute = `${host}/academic-procedures/api/inst/courses/`;
export const instAllStatsRoute = `${host}/academic-procedures/api/inst/stats/all/`;

export const adminCoursesRoute = `${host}/academic-procedures/api/acad/feedback_courses/`;
export const adminAllStatsRoute = `${host}/academic-procedures/api/acad/stats/all/`;

export const listBatchesRoute = `${host}/academic-procedures/api/acad/batch_change/batches/`;
export const listStudentsRoute = `${host}/academic-procedures/api/acad/batch_change/students/`;
export const applyBatchRoute = `${host}/academic-procedures/api/acad/batch_change/apply/`;

export const listStudentsPromoteRoute = `${host}/academic-procedures/api/acad/promote/students/`;
export const applyPromoteRoute = `${host}/academic-procedures/api/acad/promote/apply/`;
export const applyDemoteRoute = `${host}/academic-procedures/api/acad/demote/apply/`;

// Section assignment (Academics > Section Assignment)
export const sectionBatchesRoute = `${host}/aims/api/section/batches/`;
export const sectionStudentsRoute = `${host}/aims/api/section/students/`;
export const assignSectionRoute = `${host}/aims/api/section/assign/`;
export const sectionsInUseRoute = `${host}/aims/api/section/in-use/`;

export const courseRegistrationReceiptRoute = `${host}/academic-procedures/api/course_reg_receipt/`;

// ============================================================================
// PhD-SPECIFIC ROUTES (Added for PhD student management)
// ============================================================================

// PhD Thesis Registration
export const studentThesisRoute = `${host}/academic-procedures/api/stu/thesis/`;
export const studentThesisDownloadRoute = `${host}/academic-procedures/api/stu/thesis/download/`;
export const facultyListRoute = `${host}/academic-procedures/api/faculty/`;

// PhD Thesis Enrollment (semester-level registration)
export const studentThesisEnrollmentRoute = `${host}/academic-procedures/api/stu/thesis-enrollment/`;
export const adminThesisEnrollmentListRoute = `${host}/academic-procedures/api/acadadmin/thesis-enrollments/`;
export const adminVerifyEnrollmentsRoute = `${host}/academic-procedures/api/acadadmin/thesis-enrollments/verify/`;
export const adminRejectEnrollmentsRoute = `${host}/academic-procedures/api/acadadmin/thesis-enrollments/reject/`;

// PG Decimal Thesis Grading -- Supervisor Score + Batch-Wide Examiner Panel
export const supervisorThesisDecimalScoresRoute = `${host}/academic-procedures/api/supervisor/thesis-decimal-scores/`;
export const hodThesisExaminerPanelDashboardRoute = `${host}/academic-procedures/api/hod/thesis-examiner-panels/`;
export const hodSubmitThesisExaminerPanelRoute = `${host}/academic-procedures/api/hod/thesis-examiner-panels/submit/`;
export const deanThesisExaminerPanelDashboardRoute = `${host}/academic-procedures/api/dean/thesis-examiner-panels/`;
export const deanRankAndInviteExaminerPanelRoute = `${host}/academic-procedures/api/dean/thesis-examiner-panels/rank-and-invite/`;
// Reached via emailed links from arbitrary networks -- uses dynamicApiHost,
// not host, same reasoning as invitationActionRoute/reviewDetailRoute below.
export const examinerPanelInvitationActionRoute = (token, action) =>
  `${dynamicApiHost}/academic-procedures/api/thesis-examiner-panel/${token}/${action}/`;
export const examinerPanelBatchDetailRoute = (token) =>
  `${dynamicApiHost}/academic-procedures/api/thesis-examiner-panel/${token}/detail/`;
export const examinerPanelSubmitScoreRoute = (token) =>
  `${dynamicApiHost}/academic-procedures/api/thesis-examiner-panel/${token}/score/`;

// PhD Progress Seminar Enrollment (semester-level registration)
export const studentProgressSeminarEnrollmentRoute = `${host}/academic-procedures/api/stu/progress-seminar-enrollment/`;
export const adminProgressSeminarEnrollmentListRoute = `${host}/academic-procedures/api/acadadmin/progress-seminar-enrollments/`;
export const adminVerifyProgressSeminarEnrollmentsRoute = `${host}/academic-procedures/api/acadadmin/progress-seminar-enrollments/verify/`;
export const adminRejectProgressSeminarEnrollmentsRoute = `${host}/academic-procedures/api/acadadmin/progress-seminar-enrollments/reject/`;

// PhD Teaching Credit Enrollment (semester-level registration)
export const studentTeachingCreditEnrollmentRoute = `${host}/academic-procedures/api/stu/teaching-credit-enrollment/`;
export const adminTeachingCreditEnrollmentListRoute = `${host}/academic-procedures/api/acadadmin/teaching-credit-enrollments/`;
export const adminVerifyTeachingCreditEnrollmentsRoute = `${host}/academic-procedures/api/acadadmin/teaching-credit-enrollments/verify/`;
export const adminRejectTeachingCreditEnrollmentsRoute = `${host}/academic-procedures/api/acadadmin/teaching-credit-enrollments/reject/`;

// PhD Course (Coursework) Registration — standalone workflow, independent
// of the UG/PG backlog add-course flow (studentAddCourseRoute etc. above)
export const phdStudentStatusRoute = `${host}/academic-procedures/api/stu/phd/status/`;
export const phdCourseSlotsRoute = `${host}/academic-procedures/api/stu/phd/course-slots/`;
export const phdCourseSlotCoursesRoute = `${host}/academic-procedures/api/stu/phd/course-slots/courses/`;
export const phdSubmitCourseRequestRoute = `${host}/academic-procedures/api/stu/phd/course-request/`;
export const phdMyCourseRequestsRoute = `${host}/academic-procedures/api/stu/phd/my-course-requests/`;
export const phdAdminListCourseRequestsRoute = `${host}/academic-procedures/api/acadadmin/phd/course-requests/`;
export const phdAdminProcessCourseRequestsRoute = `${host}/academic-procedures/api/acadadmin/phd/course-requests/process/`;

// PhD Thesis Evaluation (block-based S/X grades) — all blocks for a student
// are graded and submitted together (manually, or via Excel upload below)
export const supervisorThesisGradesRoute = `${host}/academic-procedures/api/supervisor/thesis-grades/`;
// All blocks comprehensive upload
export const supervisorDownloadAllThesisGradesTemplateRoute = `${host}/academic-procedures/api/supervisor/thesis-grades-all-template/`;
export const supervisorUploadAllThesisGradesRoute = `${host}/academic-procedures/api/supervisor/thesis-grades-all/upload/`;
export const supervisorBulkSubmitAllThesisGradesRoute = `${host}/academic-procedures/api/supervisor/thesis-grades-all/bulk-submit/`;
export const adminThesisGradesListRoute = `${host}/academic-procedures/api/acadadmin/thesis-grades/`;
export const adminVerifyThesisGradesRoute = `${host}/academic-procedures/api/acadadmin/thesis-grades/verify/`;
export const adminAnnounceThesisGradesRoute = `${host}/academic-procedures/api/acadadmin/thesis-grades/announce/`;

// Supervisor
export const supervisorDashboardRoute = `${host}/academic-procedures/api/supervisor/dashboard/`;
export const supervisorReviewRoute = (id) =>
  `${host}/academic-procedures/api/supervisor/thesis/${id}/review/`;

// HOD
export const hodDashboardRoute = `${host}/academic-procedures/api/hod/dashboard/`;
export const hodReviewRoute = (id) =>
  `${host}/academic-procedures/api/hod/thesis/${id}/review/`;

// Dean
export const deanDashboardRoute = `${host}/academic-procedures/api/dean/dashboard/`;
export const deanReviewRoute = (id) =>
  `${host}/academic-procedures/api/dean/thesis/${id}/review/`;
export const deanGeneratePdfRoute = (id) =>
  `${host}/academic-procedures/api/dean/thesis/${id}/generate/`;

// PhD Seminar
export const studentSeminarListRoute = `${host}/academic-procedures/api/seminar-reports/`;
export const studentSeminarCreateRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/create/${id}/`;
export const studentSeminarDetailRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/${id}/`;

export const rpcSeminarListRoute = `${host}/academic-procedures/api/seminar-reports/list/`;
export const rpcDetailRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/${id}/rpc-detail/`;
export const rpcSeminarDetailRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/${id}/rpc-detail/`;
export const rpcConsentRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/${id}/rpc-consent/`;
export const rpcSeminarConsentRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/${id}/rpc-consent/`;
export const rpcFinalizeRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/${id}/rpc-finalize/`;
export const rpcSeminarFinalizeRoute = (id) =>
  `${host}/academic-procedures/api/seminar-reports/${id}/rpc-finalize/`;

// PhD Thesis Submission
export const thesisSubmitRoute = `${host}/academic-procedures/api/thesis/submit/`;
export const thesisSubmissionStatusRoute = `${host}/academic-procedures/api/thesis/submission-status/`;

// PG Thesis Submission -- separate from PhD's ThesisSubmission (no Dean
// Panel/Director/foreign-examiner chain), feeds the PG decimal-scoring flow.
export const pgThesisSubmitRoute = `${host}/academic-procedures/api/stu/pg-thesis-submit/`;
export const pgThesisSubmissionStatusRoute = `${host}/academic-procedures/api/stu/pg-thesis-submission-status/`;
export const supervisorThesisDashboardRoute = `${host}/academic-procedures/api/thesis/supervisor-dashboard/`;
export const supervisorDashboardRouteThesisSubmission = `${host}/academic-procedures/api/thesis/supervisor-dashboard/`;
export const supervisorSubmissionDetailRoute = (id) =>
  `${host}/academic-procedures/api/thesis/submission-detail/${id}/`;
export const supervisorAssignRoute = `${host}/academic-procedures/api/thesis/supervisor-assign/`;
export const supervisorReviewReportsRoute = `${host}/academic-procedures/api/thesis/supervisor-review-reports/`;
export const examinerHonorariumListRoute = `${host}/academic-procedures/api/thesis/examiner-honorarium/`;
export const deanThesisPanelDashboardRoute = `${host}/academic-procedures/api/thesis/dean-dashboard/`;
export const deanPanelApproveRoute = `${host}/academic-procedures/api/thesis/dean-panel-approve/`;
export const deanSendInvitationsRoute = `${host}/academic-procedures/api/thesis/dean-send-invitations/`;
export const directorDashboardRoute = `${host}/academic-procedures/api/thesis/director-dashboard/`;
export const directorApproveRoute = `${host}/academic-procedures/api/thesis/director-approve/`;

// Post-evaluation workflow (both examiner reports in -> revise/reconfirm loop -> defense)
export const studentSubmitRevisionRoute = `${host}/academic-procedures/api/thesis/submit-revision/`;
export const supervisorReportsDecisionRoute = `${host}/academic-procedures/api/thesis/supervisor-reports-decision/`;
export const supervisorFinalizeRevisionRoute = `${host}/academic-procedures/api/thesis/supervisor-finalize-revision/`;
export const deanForwardReportsRoute = `${host}/academic-procedures/api/thesis/dean-forward-reports/`;
export const deanFinalReviewRoute = `${host}/academic-procedures/api/thesis/dean-final-review/`;
export const thesisRevisionRpcListRoute = `${host}/academic-procedures/api/thesis/revision-rpc/`;
export const thesisRevisionRpcConsentRoute = `${host}/academic-procedures/api/thesis/revision-rpc/consent/`;

// External Reviewer (token-based). Reached via emailed links from arbitrary
// networks -- uses dynamicApiHost, not host, so it works regardless of what
// domain the page is actually opened on.
export const invitationActionRoute = (token, action) =>
  `${dynamicApiHost}/academic-procedures/api/invitation/${token}/${action}/`;
export const reviewDetailRoute = (token) =>
  `${dynamicApiHost}/academic-procedures/api/review/${token}/`;

// ============================================================================
// PhD Comprehensive Examination
// ============================================================================

// Student
export const studentComprehensiveExamRoute = `${host}/academic-procedures/api/stu/comprehensive-exam/`;

// Supervisor
export const supervisorComprehensiveExamDashboardRoute = `${host}/academic-procedures/api/supervisor/comprehensive-exam/dashboard/`;
export const supervisorStudentAcademicInfoRoute = (rollNo) =>
  `${host}/academic-procedures/api/supervisor/comprehensive-exam/student-info/${rollNo}/`;
export const supervisorProposeComprehensiveExamRoute = `${host}/academic-procedures/api/supervisor/comprehensive-exam/propose/`;
export const supervisorComprehensiveExamDetailRoute = (id) =>
  `${host}/academic-procedures/api/supervisor/comprehensive-exam/${id}/`;
export const supervisorResubmitComprehensiveExamRoute = (id) =>
  `${host}/academic-procedures/api/supervisor/comprehensive-exam/${id}/resubmit/`;
export const supervisorSetExamDateRoute = (attemptId) =>
  `${host}/academic-procedures/api/supervisor/comprehensive-exam/attempt/${attemptId}/set-exam-date/`;

// Academic Office (acadadmin)
export const academicOfficeComprehensiveExamListRoute = `${host}/academic-procedures/api/acadadmin/comprehensive-exam/`;
export const academicOfficeVerifyComprehensiveExamRoute = (id) =>
  `${host}/academic-procedures/api/acadadmin/comprehensive-exam/${id}/verify/`;

// Convener DPGC (HOD of the student's department stands in)
export const hodDpgcComprehensiveExamDashboardRoute = `${host}/academic-procedures/api/hod/comprehensive-exam/dpgc-dashboard/`;
export const hodDpgcApproveComprehensiveExamRoute = (id) =>
  `${host}/academic-procedures/api/hod/comprehensive-exam/${id}/dpgc-approve/`;

// RPC (the student's existing committee, fetched live)
export const rpcComprehensiveExamListRoute = `${host}/academic-procedures/api/faculty/comprehensive-exam/rpc/`;
export const rpcComprehensiveExamDetailRoute = (attemptId) =>
  `${host}/academic-procedures/api/faculty/comprehensive-exam/rpc/${attemptId}/`;
export const rpcComprehensiveExamConsentRoute = (attemptId) =>
  `${host}/academic-procedures/api/faculty/comprehensive-exam/rpc/${attemptId}/consent/`;
export const rpcComprehensiveExamFinalizeRoute = (attemptId) =>
  `${host}/academic-procedures/api/faculty/comprehensive-exam/rpc/${attemptId}/finalize/`;

// Convener PGCS (HOD of the student's department stands in)
export const hodPgcsComprehensiveExamDashboardRoute = `${host}/academic-procedures/api/hod/comprehensive-exam/pgcs-dashboard/`;
export const hodPgcsReviewComprehensiveExamRoute = (attemptId) =>
  `${host}/academic-procedures/api/hod/comprehensive-exam/attempt/${attemptId}/pgcs-review/`;

// Dean Academic (forward-only final sign-off)
export const deanComprehensiveExamDashboardRoute = `${host}/academic-procedures/api/dean/comprehensive-exam/dashboard/`;
export const deanApproveComprehensiveExamRoute = (attemptId) =>
  `${host}/academic-procedures/api/dean/comprehensive-exam/attempt/${attemptId}/approve/`;

// Course catalog (used by Teaching Credit's course-choice pickers)
export const listCoursesForDropdownRoute = `${host}/academic-procedures/api/courses/dropdown/`;

// ============================================================================
// PhD Open Seminar
// ============================================================================

// Student
export const studentOpenSeminarRoute = `${host}/academic-procedures/api/stu/open-seminar/`;

// Shared
export const openSeminarEligibilityPreviewRoute = (rollNo) =>
  `${host}/academic-procedures/api/supervisor/open-seminar/eligibility/${rollNo}/`;

// Supervisor
export const supervisorOpenSeminarDashboardRoute = `${host}/academic-procedures/api/supervisor/open-seminar/dashboard/`;
export const supervisorProposeOpenSeminarRoute = `${host}/academic-procedures/api/supervisor/open-seminar/propose/`;
export const supervisorOpenSeminarDetailRoute = (id) =>
  `${host}/academic-procedures/api/supervisor/open-seminar/${id}/`;
export const supervisorResubmitOpenSeminarRoute = (id) =>
  `${host}/academic-procedures/api/supervisor/open-seminar/${id}/resubmit/`;
export const supervisorSetSeminarDateRoute = (attemptId) =>
  `${host}/academic-procedures/api/supervisor/open-seminar/attempt/${attemptId}/set-seminar-date/`;

// Convener DPGC, early review (HOD of the student's department stands in)
export const hodDpgcOpenSeminarDashboardRoute = `${host}/academic-procedures/api/hod/open-seminar/dpgc-dashboard/`;
export const hodDpgcReviewOpenSeminarRoute = (id) =>
  `${host}/academic-procedures/api/hod/open-seminar/${id}/dpgc-review/`;

// RPC (the student's existing committee, fetched live)
export const rpcOpenSeminarListRoute = `${host}/academic-procedures/api/faculty/open-seminar/rpc/`;
export const rpcOpenSeminarDetailRoute = (attemptId) =>
  `${host}/academic-procedures/api/faculty/open-seminar/rpc/${attemptId}/`;
export const rpcOpenSeminarConsentRoute = (attemptId) =>
  `${host}/academic-procedures/api/faculty/open-seminar/rpc/${attemptId}/consent/`;
export const rpcOpenSeminarFinalizeRoute = (attemptId) =>
  `${host}/academic-procedures/api/faculty/open-seminar/rpc/${attemptId}/finalize/`;

// Convener DPGC, second review (HOD of the student's department stands in)
export const hodReviewOpenSeminarDashboardRoute = `${host}/academic-procedures/api/hod/open-seminar/review-dashboard/`;
export const hodReviewOpenSeminarRoute = (attemptId) =>
  `${host}/academic-procedures/api/hod/open-seminar/attempt/${attemptId}/review/`;

// Dean Academic (appoints Dean Nominee early; forward-only final approval)
export const deanOpenSeminarDashboardRoute = `${host}/academic-procedures/api/dean/open-seminar/dashboard/`;
export const deanAppointNomineeOpenSeminarRoute = (id) =>
  `${host}/academic-procedures/api/dean/open-seminar/${id}/appoint-nominee/`;
export const deanApproveOpenSeminarRoute = (attemptId) =>
  `${host}/academic-procedures/api/dean/open-seminar/attempt/${attemptId}/approve/`;

// Dean Nominee (ad-hoc faculty appointment)
export const deanNomineeOpenSeminarDashboardRoute = `${host}/academic-procedures/api/faculty/open-seminar-nominee/dashboard/`;
export const deanNomineeSubmitOpenSeminarReportRoute = (attemptId) =>
  `${host}/academic-procedures/api/faculty/open-seminar-nominee/attempt/${attemptId}/report/`;

// ============================================================================
// PhD Teaching Credit
// ============================================================================

// Student
export const studentTeachingCreditRoute = `${host}/academic-procedures/api/stu/teaching-credit/`;
export const studentProposeTeachingCreditRoute = `${host}/academic-procedures/api/stu/teaching-credit/propose/`;
export const studentTeachingCreditDetailRoute = (id) =>
  `${host}/academic-procedures/api/stu/teaching-credit/${id}/`;
export const studentResubmitTeachingCreditRoute = (id) =>
  `${host}/academic-procedures/api/stu/teaching-credit/${id}/resubmit/`;
export const studentTeachingCreditEvaluationTargetsRoute = `${host}/academic-procedures/api/stu/teaching-credit/evaluation-targets/`;
export const studentSubmitTeachingCreditEvaluationRoute = (id) =>
  `${host}/academic-procedures/api/stu/teaching-credit/${id}/evaluate/`;

// HOD
export const hodTeachingCreditDashboardRoute = `${host}/academic-procedures/api/hod/teaching-credit/dashboard/`;
export const hodDecideTeachingCreditRoute = (id) =>
  `${host}/academic-procedures/api/hod/teaching-credit/${id}/decide/`;
export const hodCompleteTeachingCreditRoute = (id) =>
  `${host}/academic-procedures/api/hod/teaching-credit/${id}/complete/`;

// Supervisor (read-only)
export const supervisorTeachingCreditListRoute = `${host}/academic-procedures/api/supervisor/teaching-credit/`;

// Academic Office (read-only)
export const academicOfficeTeachingCreditListRoute = `${host}/academic-procedures/api/acadadmin/teaching-credit/`;

// ============================================================================
// Whole-College Semester Timetable Generation System
// ============================================================================

// Core solver & version management
export const timetableGenerateRoute = `${host}/academic-procedures/api/timetable/generate/`;
export const timetableVersionsRoute = `${host}/academic-procedures/api/timetable/versions/`;
export const timetableSlotsRoute = `${host}/academic-procedures/api/timetable/slots/`;
export const timetableSlotOverrideRoute = `${host}/academic-procedures/api/timetable/slot/override/`;
export const timetablePublishVersionRoute = (versionId) =>
  `${host}/academic-procedures/api/timetable/version/${versionId}/publish/`;

// Personalised schedule (WF-02)
export const timetableMyScheduleRoute = `${host}/academic-procedures/api/timetable/my-schedule/`;

// Room utilization heatmap
export const timetableRoomUtilizationRoute = `${host}/academic-procedures/api/timetable/room-utilization/`;

// Conflict diagnostics
export const timetableConflictLogRoute = `${host}/academic-procedures/api/timetable/conflict-log/`;

// Classroom CRUD
export const timetableClassroomsRoute = `${host}/academic-procedures/api/timetable/classrooms/`;
export const timetableClassroomDetailRoute = (roomId) =>
  `${host}/academic-procedures/api/timetable/classrooms/${roomId}/`;

// CourseWeeklyRequirement
export const timetableWeeklyRequirementsRoute = `${host}/academic-procedures/api/timetable/weekly-requirements/`;

// ElectiveBasket
export const timetableElectiveBasketsRoute = `${host}/academic-procedures/api/timetable/elective-baskets/`;

// FacultyPreference
export const timetableFacultyPreferencesRoute = `${host}/academic-procedures/api/timetable/faculty-preferences/`;

// Legacy stubs kept for backward compatibility with existing AdminSemesterTimetable refs
export const generateTimetableRoute = timetableGenerateRoute;
export const viewTimetableRoute = timetableSlotsRoute;
