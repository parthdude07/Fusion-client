/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/**
 * AdminSemesterTimetable
 * ======================
 * Whole-College Timetable Generation Console for Fusion IIIT.
 *
 * Features
 * --------
 *  • Generate whole-college OR-Tools CP-SAT schedule (WF-01)
 *  • Interactive 5-day grid with colour-coded slot types
 *  • Filter by version, batch, programme, branch, section
 *  • Manual slot override modal with real-time conflict checks
 *  • Version lifecycle: Draft → Publish (Dean Academic)
 *  • Room utilization heatmap tab
 *  • Conflict diagnostics log
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Select,
  NumberInput,
  Group,
  Stack,
  Text,
  Title,
  Loader,
  Alert,
  Badge,
  Tabs,
  Table,
  Modal,
  TextInput,
  Tooltip,
  ActionIcon,
  ScrollArea,
  Box,
  ThemeIcon,
  Paper,
} from "@mantine/core";
import {
  IconCalendar,
  IconRefresh,
  IconSend,
  IconAlertTriangle,
  IconCheck,
  IconLock,
  IconLockOpen,
  IconEdit,
  IconChartBar,
  IconList,
  IconInfoCircle,
  IconBolt,
} from "@tabler/icons-react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  timetableGenerateRoute,
  timetableSlotsRoute,
  timetableVersionsRoute,
  timetablePublishVersionRoute,
  timetableSlotOverrideRoute,
  timetableRoomUtilizationRoute,
  timetableConflictLogRoute,
} from "../../routes/academicRoutes";

// ── Constants ────────────────────────────────────────────────────────────────

const DAY_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const HOURS = [9, 10, 11, 12, 14, 15, 16, 17];
const HOUR_LABELS = {
  9: "09:00",
  10: "10:00",
  11: "11:00",
  12: "12:00",
  14: "14:00",
  15: "15:00",
  16: "16:00",
  17: "17:00",
};

const SLOT_COLORS = {
  Lecture: { bg: "#1e3a5f", text: "#90c2ff", border: "#3b7dd8" },
  Tutorial: { bg: "#1e4d2b", text: "#86efac", border: "#22c55e" },
  Practical: { bg: "#4a1d4a", text: "#e879f9", border: "#a855f7" },
};

const STATUS_COLOR = {
  Draft: "gray",
  UnderReview: "yellow",
  Approved: "blue",
  Published: "green",
  Archived: "dimmed",
  Infeasible: "red",
};

const PUBLISH_ROLES = ["Dean Academic", "Associate Dean Academic Affairs"];
const PUBLISHABLE_STATUSES = ["Draft", "UnderReview", "Approved"];
const EDITABLE_STATUSES = [...PUBLISHABLE_STATUSES, "Published"];

const authHeaders = () => ({
  Authorization: `Token ${localStorage.getItem("authToken")}`,
});

// ── Styles ────────────────────────────────────────────────────────────────────

const inputStyles = {
  background: "#0f1629",
  border: "1px solid #1e293b",
  color: "#e2e8f0",
  borderRadius: 6,
};
const labelStyles = { color: "#94a3b8", fontSize: 11 };

const styles = {
  container: {
    background: "#060d1a",
    minHeight: "100vh",
    padding: "16px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, #0d1526 0%, #1a1040 100%)",
    border: "1px solid #1e293b",
    borderRadius: 12,
  },
  card: {
    background: "#0d1526",
    border: "1px solid #1e293b",
    borderRadius: 10,
  },
  generateBtn: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    border: "none",
    marginTop: 18,
  },
  grid: {
    borderCollapse: "collapse",
    width: "100%",
    minWidth: 700,
  },
  th: {
    background: "#111827",
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: 600,
    padding: "8px 12px",
    textAlign: "center",
    borderBottom: "1px solid #1e293b",
  },
  thTime: {
    background: "#111827",
    color: "#6b7280",
    fontSize: 11,
    padding: "8px 12px",
    textAlign: "right",
    borderBottom: "1px solid #1e293b",
    width: 70,
  },
  tdTime: {
    padding: "6px 12px",
    textAlign: "right",
    borderRight: "1px solid #1e293b",
    background: "#0f172a",
    verticalAlign: "middle",
  },
  slotCell: {
    padding: "6px 8px",
    verticalAlign: "top",
    border: "1px solid #1e293b",
    minWidth: 120,
    height: 60,
    cursor: "default",
    transition: "filter 0.15s",
  },
  emptyCell: {
    border: "1px solid #1a2332",
    background: "#0a0f1d",
    minWidth: 120,
    height: 60,
  },
};

// ── Subcomponents ─────────────────────────────────────────────────────────────

function SlotCard({ slot, onEdit }) {
  const colors = SLOT_COLORS[slot.slot_type] || SLOT_COLORS.Lecture;
  return (
    <div
      style={{
        background: colors.bg,
        borderLeft: `3px solid ${colors.border}`,
        borderRadius: 4,
        padding: "4px 6px",
        marginBottom: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <Text size="xs" fw={700} c={colors.text} style={{ lineHeight: 1.2 }}>
            {slot.course_code}
          </Text>
          <Text size="xs" c="dimmed" style={{ fontSize: 10 }}>
            {slot.slot_type.charAt(0)} · {slot.classroom}
            {slot.branch ? ` · ${slot.branch}` : ""}
          </Text>
          {slot.faculty && (
            <Text size="xs" c="dimmed" style={{ fontSize: 10, marginTop: 2 }}>
              {slot.faculty.split(" ").slice(-1)[0]}
            </Text>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {slot.is_locked && (
            <Tooltip label="Locked slot">
              <ThemeIcon size="xs" color="yellow" variant="light">
                <IconLock size={10} />
              </ThemeIcon>
            </Tooltip>
          )}
          {onEdit && (
            <ActionIcon
              size="xs"
              variant="subtle"
              color="gray"
              onClick={() => onEdit(slot)}
            >
              <IconEdit size={10} />
            </ActionIcon>
          )}
        </div>
      </div>
    </div>
  );
}

function SlotCell({ cellSlots, onEdit }) {
  if (!cellSlots || cellSlots.length === 0)
    return <td style={styles.emptyCell} />;
  return (
    <td style={{ ...styles.slotCell, padding: 4 }}>
      {cellSlots.map((s) => (
        <SlotCard key={s.id} slot={s} onEdit={onEdit} />
      ))}
    </td>
  );
}

export function TimetableGrid({ slots, onEdit }) {
  // Build lookup: day → hour → slots[]
  const grid = {};
  slots.forEach((s) => {
    if (!grid[s.day]) grid[s.day] = {};
    const h = parseInt(s.start_time, 10);
    if (!grid[s.day][h]) grid[s.day][h] = [];
    grid[s.day][h].push(s);
  });

  return (
    <ScrollArea>
      <table style={styles.grid}>
        <thead>
          <tr>
            <th style={styles.thTime}>Time</th>
            {DAY_FULL.map((d) => (
              <th key={d} style={styles.th}>
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HOURS.map((hour) => (
            <React.Fragment key={hour}>
              {hour === 14 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      color: "#6b7280",
                      background: "#111827",
                      padding: "4px 0",
                      fontStyle: "italic",
                    }}
                  >
                    — Lunch Break 13:00–14:00 —
                  </td>
                </tr>
              )}
              <tr>
                <td style={styles.tdTime}>
                  <Text size="xs" c="dimmed">
                    {HOUR_LABELS[hour]}
                  </Text>
                </td>
                {[1, 2, 3, 4, 5].map((day) => (
                  <SlotCell
                    key={day}
                    cellSlots={grid[day]?.[hour]}
                    onEdit={onEdit}
                  />
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}

function VersionBadge({ status }) {
  return (
    <Badge color={STATUS_COLOR[status] || "gray"} size="sm">
      {status}
    </Badge>
  );
}

// ── Override Modal (WF-03) ────────────────────────────────────────────────────

function OverrideModal({ slot, opened, onClose, onSuccess }) {
  const [newDay, setNewDay] = useState(slot?.day ?? 1);
  const [newHour, setNewHour] = useState(
    slot ? parseInt(slot.block_start_time || slot.start_time, 10) : 9,
  );
  const [newRoom, setNewRoom] = useState(slot?.classroom ?? "");
  const [lock, setLock] = useState(slot?.is_locked ?? false);
  const [loading, setLoading] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (slot) {
      setNewDay(slot.day);
      setNewHour(parseInt(slot.block_start_time || slot.start_time, 10));
      setNewRoom(slot.classroom);
      setLock(slot.is_locked);
      setConflicts([]);
      setError(null);
      setSuccess(false);
    }
  }, [slot]);

  const handleSubmit = async () => {
    setLoading(true);
    setConflicts([]);
    setError(null);
    setSuccess(false);
    try {
      await axios.post(
        timetableSlotOverrideRoute,
        {
          slot_id: slot.id,
          new_day: newDay,
          new_start_hour: newHour,
          new_room_id: newRoom,
          lock,
        },
        { headers: authHeaders() },
      );
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      if (err.response?.status === 409) {
        setConflicts(err.response.data.conflicts || []);
      } else {
        setError(
          err.response?.data?.error || "Could not move this timetable slot.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={700}>Override Slot: {slot?.course_code}</Text>}
      size="md"
      styles={{ modal: { background: "#1a1a2e", color: "#e2e8f0" } }}
    >
      <Stack gap="sm">
        <Select
          label="New Day"
          value={String(newDay)}
          onChange={(v) => setNewDay(parseInt(v, 10))}
          data={DAY_FULL.map((d, i) => ({ value: String(i + 1), label: d }))}
        />
        <Select
          label="New Start Hour"
          value={String(newHour)}
          onChange={(v) => setNewHour(parseInt(v, 10))}
          data={HOURS.map((h) => ({
            value: String(h),
            label: `${HOUR_LABELS[h]} – ${HOUR_LABELS[h] ? `${String(h + 1).padStart(2, "0")}:00` : ""}`,
          }))}
        />
        <TextInput
          label="New Room ID"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="e.g. L101"
        />
        <Group>
          <Button
            variant={lock ? "filled" : "outline"}
            color="yellow"
            size="xs"
            leftSection={
              lock ? <IconLock size={14} /> : <IconLockOpen size={14} />
            }
            onClick={() => setLock(!lock)}
          >
            {lock ? "Will Lock Slot" : "Won't Lock"}
          </Button>
        </Group>

        {conflicts.length > 0 && (
          <Alert
            color="red"
            icon={<IconAlertTriangle size={16} />}
            title="Conflicts Detected"
          >
            {conflicts.map((c, i) => (
              <Text key={i} size="xs">
                {c.type}: {c.detail}
              </Text>
            ))}
          </Alert>
        )}
        {error && (
          <Alert color="red" icon={<IconAlertTriangle size={16} />}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="green" icon={<IconCheck size={16} />}>
            Slot moved successfully.
          </Alert>
        )}

        <Button
          onClick={handleSubmit}
          loading={loading}
          color="indigo"
          disabled={success}
          leftSection={<IconSend size={14} />}
        >
          Apply Move
        </Button>
      </Stack>
    </Modal>
  );
}

// ── Room Heatmap ─────────────────────────────────────────────────────────────

function RoomHeatmap({ versionId }) {
  const [roomId, setRoomId] = useState("L101");
  const [matrix, setMatrix] = useState({});
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    if (!roomId) return;
    setLoading(true);
    try {
      const res = await axios.get(timetableRoomUtilizationRoute, {
        params: { room_id: roomId, version_id: versionId },
        headers: authHeaders(),
      });
      setMatrix(res.data.matrix || {});
    } catch {
      /* ignore network error, UI falls back to empty state */
    }
    setLoading(false);
  }, [roomId, versionId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Stack>
      <Group>
        <TextInput
          label="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ width: 140 }}
        />
        <Button onClick={fetch} loading={loading} variant="light" size="sm">
          Load
        </Button>
      </Group>
      <ScrollArea>
        <table style={{ borderCollapse: "collapse", minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: 70 }}>Time</th>
              {DAY_FULL.map((d) => (
                <th key={d} style={styles.th}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((h) => (
              <tr key={h}>
                <td style={styles.tdTime}>
                  <Text size="xs" c="dimmed">
                    {HOUR_LABELS[h]}
                  </Text>
                </td>
                {[1, 2, 3, 4, 5].map((day) => {
                  const val = matrix[day]?.[h];
                  return (
                    <td
                      key={day}
                      style={{
                        ...styles.slotCell,
                        background: val ? "#1e3a5f" : "#0f172a",
                        textAlign: "center",
                        color: val ? "#90c2ff" : "#374151",
                        fontSize: 11,
                      }}
                    >
                      {val || "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </Stack>
  );
}

// ── Conflict Log ─────────────────────────────────────────────────────────────

function ConflictLog({ versionId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!versionId) return;
    setLoading(true);
    axios
      .get(timetableConflictLogRoute, {
        params: { version_id: versionId },
        headers: authHeaders(),
      })
      .then((r) => setLogs(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [versionId]);

  if (loading) return <Loader size="sm" />;
  if (!logs.length)
    return (
      <Text c="dimmed" size="sm">
        No conflict entries.
      </Text>
    );

  const severityColor = { CRITICAL: "red", WARNING: "yellow", INFO: "blue" };

  return (
    <Table striped highlightOnHover style={{ fontSize: 12 }}>
      <thead>
        <tr>
          <th>Severity</th>
          <th>Code</th>
          <th>Description</th>
          <th>Curriculum ID</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((l) => (
          <tr key={l.id}>
            <td>
              <Badge color={severityColor[l.severity] || "gray"} size="xs">
                {l.severity}
              </Badge>
            </td>
            <td>
              <Text size="xs" family="monospace">
                {l.error_code}
              </Text>
            </td>
            <td>
              <Text size="xs">{l.description}</Text>
            </td>
            <td>
              <Text size="xs" c="dimmed">
                {l.curriculum_id_ref ?? "—"}
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AdminSemesterTimetable() {
  const role = useSelector((state) => state.user.role);

  // Generation params
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());
  const [semesterType, setSemesterType] = useState("Odd Semester");
  const [timeout, setTimeout] = useState(60);

  // Version management
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);

  // Slot filters
  const [batch, setBatch] = useState("");
  const [programme, setProg] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");

  // Slot data
  const [slots, setSlots] = useState([]);

  // UI state
  const [generating, setGenerating] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [genResult, setGenResult] = useState(null);
  const [genError, setGenError] = useState(null);
  const [activeTab, setActiveTab] = useState("grid");
  const [overrideSlot, setOverrideSlot] = useState(null);

  // ── Fetch versions ───────────────────────────────────────────────────── //
  const fetchVersions = useCallback(
    async (preferredVersionId = null) => {
      setLoadingVersions(true);
      try {
        const res = await axios.get(timetableVersionsRoute, {
          params: {
            academic_year: academicYear,
            semester_type: semesterType,
          },
          headers: authHeaders(),
        });
        const vs = res.data;
        setVersions(vs);
        setSelectedVersion((currentVersion) => {
          const preferred =
            typeof preferredVersionId === "number"
              ? preferredVersionId
              : currentVersion;
          return vs.some((version) => version.id === preferred)
            ? preferred
            : (vs[0]?.id ?? null);
        });
      } catch {
        setVersions([]);
        setSelectedVersion(null);
      }
      setLoadingVersions(false);
    },
    [academicYear, semesterType],
  );

  // ── Fetch slots ──────────────────────────────────────────────────────── //
  const fetchSlots = useCallback(async () => {
    if (!selectedVersion) return;
    setLoadingSlots(true);
    try {
      const params = { version_id: selectedVersion };
      if (batch) params.batch = batch;
      if (programme) params.programme = programme;
      if (branch) params.branch = branch;
      if (section) params.section = section;

      const res = await axios.get(timetableSlotsRoute, {
        params,
        headers: authHeaders(),
      });
      setSlots(res.data);
    } catch {
      /* ignore network error, UI falls back to empty state */
    }
    setLoadingSlots(false);
  }, [selectedVersion, batch, programme, branch, section]);

  useEffect(() => {
    fetchVersions();
  }, [fetchVersions]);
  useEffect(() => {
    if (selectedVersion) {
      fetchSlots();
    } else {
      setSlots([]);
    }
  }, [selectedVersion, fetchSlots]);

  // ── Generate ─────────────────────────────────────────────────────────── //
  const handleGenerate = async () => {
    setGenerating(true);
    setGenResult(null);
    setGenError(null);
    try {
      const res = await axios.post(
        timetableGenerateRoute,
        {
          academic_year: academicYear,
          semester_type: semesterType,
          timeout_seconds: timeout,
        },
        { headers: authHeaders() },
      );
      setGenResult(res.data);
      await fetchVersions(res.data.version_id);
    } catch (err) {
      const d = err.response?.data;
      setGenError(
        d?.message || d?.error || "Generation failed. Ensure acadadmin role.",
      );
    } finally {
      setGenerating(false);
    }
  };

  // ── Publish ──────────────────────────────────────────────────────────── //
  const handlePublish = async () => {
    if (!selectedVersion) return;
    setPublishing(true);
    setPublishError(null);
    try {
      await axios.patch(
        timetablePublishVersionRoute(selectedVersion),
        { publish_notes: "Approved via Admin Console" },
        { headers: authHeaders() },
      );
      await fetchVersions(selectedVersion);
    } catch (err) {
      setPublishError(
        err.response?.data?.error ||
          "Could not publish this timetable version.",
      );
    }
    setPublishing(false);
  };

  const selectedVersionObj = versions.find((v) => v.id === selectedVersion);
  const canPublish = PUBLISH_ROLES.includes(role);
  const selectedVersionIsPublishable = PUBLISHABLE_STATUSES.includes(
    selectedVersionObj?.status,
  );
  const selectedVersionIsEditable = EDITABLE_STATUSES.includes(
    selectedVersionObj?.status,
  );

  // ── Render ────────────────────────────────────────────────────────────── //
  return (
    <Box style={styles.container}>
      {/* ── Header ── */}
      <Paper style={styles.header} p="lg" mb="md">
        <Group justify="space-between" align="center">
          <Group>
            <ThemeIcon
              size={44}
              radius="md"
              gradient={{ from: "indigo", to: "cyan" }}
              variant="gradient"
            >
              <IconCalendar size={24} />
            </ThemeIcon>
            <div>
              <Title order={3} style={{ color: "#e2e8f0" }}>
                Whole-College Timetable Console
              </Title>
              <Text size="sm" c="dimmed">
                OR-Tools CP-SAT Scheduling Engine · IIITDM Jabalpur
              </Text>
            </div>
          </Group>
          <Group>
            <NumberInput
              label="Academic Year"
              value={academicYear}
              onChange={setAcademicYear}
              min={2020}
              max={2035}
              style={{ width: 130 }}
              styles={{ input: inputStyles, label: labelStyles }}
            />
            <Select
              label="Semester"
              value={semesterType}
              onChange={setSemesterType}
              data={["Odd Semester", "Even Semester", "Summer Term"]}
              style={{ width: 160 }}
              styles={{ input: inputStyles, label: labelStyles }}
            />
            <NumberInput
              label="Timeout (s)"
              value={timeout}
              onChange={setTimeout}
              min={10}
              max={600}
              style={{ width: 110 }}
              styles={{ input: inputStyles, label: labelStyles }}
            />
            <Button
              onClick={handleGenerate}
              loading={generating}
              leftSection={<IconBolt size={16} />}
              style={styles.generateBtn}
              size="sm"
            >
              Generate Schedule
            </Button>
          </Group>
        </Group>

        {genResult && (
          <Alert
            mt="sm"
            color="green"
            icon={<IconCheck size={16} />}
            style={{ background: "#052e16" }}
          >
            <Text size="sm" c="#86efac">
              ✔ {genResult.solver_status} · {genResult.slots_created} slots ·{" "}
              {genResult.solve_time_sec}s &nbsp;(Version {genResult.version_id})
            </Text>
          </Alert>
        )}
        {genError && (
          <Alert
            mt="sm"
            color="red"
            icon={<IconAlertTriangle size={16} />}
            style={{ background: "#2d0a0a" }}
          >
            <Text size="sm" c="#fca5a5">
              {genError}
            </Text>
          </Alert>
        )}
      </Paper>

      {/* ── Version selector ── */}
      <Paper style={styles.card} p="sm" mb="md">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            {loadingVersions ? <Loader size="xs" /> : null}
            {versions.map((v) => (
              <Button
                key={v.id}
                size="xs"
                variant={v.id === selectedVersion ? "filled" : "outline"}
                color={STATUS_COLOR[v.status] || "gray"}
                onClick={() => setSelectedVersion(v.id)}
              >
                v{v.version_number} &nbsp;
                <VersionBadge status={v.status} />
                &nbsp;·&nbsp;{v.slots_created ?? "?"} slots
              </Button>
            ))}
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={() => fetchVersions()}
            >
              <IconRefresh size={14} />
            </ActionIcon>
          </Group>

          {selectedVersionObj && (
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                Created:{" "}
                {new Date(selectedVersionObj.created_at).toLocaleString()}
              </Text>
              {selectedVersionIsPublishable && canPublish && (
                <Button
                  size="xs"
                  color="green"
                  loading={publishing}
                  leftSection={<IconCheck size={12} />}
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              )}
              {selectedVersionIsPublishable && !canPublish && (
                <Text size="xs" c="dimmed">
                  Dean Academic approval is required to publish.
                </Text>
              )}
            </Group>
          )}
        </Group>
        {publishError && (
          <Alert mt="sm" color="red" icon={<IconAlertTriangle size={16} />}>
            {publishError}
          </Alert>
        )}
      </Paper>

      {/* ── Slot Filters ── */}
      <Paper style={styles.card} p="sm" mb="md">
        <Group gap="xs" wrap="nowrap">
          <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
            Filter:
          </Text>
          <TextInput
            placeholder="Batch (year)"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            style={{ width: 100 }}
            size="xs"
            styles={{
              input: { ...inputStyles, padding: "4px 8px", height: 30 },
            }}
          />
          <Select
            placeholder="Programme"
            value={programme}
            onChange={setProg}
            clearable
            size="xs"
            data={["B.Tech", "M.Tech", "B.Des", "M.Des", "PhD"]}
            style={{ width: 110 }}
            styles={{
              input: { ...inputStyles, padding: "4px 8px", height: 30 },
            }}
          />
          <Select
            placeholder="Branch"
            value={branch}
            onChange={setBranch}
            clearable
            size="xs"
            data={[
              "CSE",
              "ECE",
              "ME",
              { value: "DESIGN", label: "Design" },
              "Common",
            ]}
            style={{ width: 100 }}
            styles={{
              input: { ...inputStyles, padding: "4px 8px", height: 30 },
            }}
          />
          <Select
            placeholder="Section"
            value={section}
            onChange={setSection}
            clearable
            size="xs"
            data={["A", "B", "C", "D", "E", "F"]}
            style={{ width: 90 }}
            styles={{
              input: { ...inputStyles, padding: "4px 8px", height: 30 },
            }}
          />
          <Button
            size="xs"
            variant="subtle"
            onClick={fetchSlots}
            loading={loadingSlots}
            leftSection={<IconRefresh size={12} />}
          >
            Refresh
          </Button>
        </Group>
      </Paper>

      {/* ── Main Tabs ── */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="grid" leftSection={<IconCalendar size={14} />}>
            Weekly Grid
          </Tabs.Tab>
          <Tabs.Tab value="list" leftSection={<IconList size={14} />}>
            Slot List
          </Tabs.Tab>
          <Tabs.Tab value="heatmap" leftSection={<IconChartBar size={14} />}>
            Room Heatmap
          </Tabs.Tab>
          <Tabs.Tab
            value="conflicts"
            leftSection={<IconAlertTriangle size={14} />}
          >
            Conflict Log
          </Tabs.Tab>
        </Tabs.List>

        {/* Weekly Grid */}
        <Tabs.Panel value="grid" pt="sm">
          <Paper style={styles.card} p="sm">
            {loadingSlots ? (
              <Group justify="center" p="xl">
                <Loader variant="dots" />
              </Group>
            ) : slots.length === 0 ? (
              <Alert
                color="blue"
                icon={<IconInfoCircle size={16} />}
                style={{ background: "#0c1445" }}
              >
                No slots to display. Generate a timetable or adjust filters.
              </Alert>
            ) : (
              <TimetableGrid
                slots={slots}
                onEdit={selectedVersionIsEditable ? setOverrideSlot : undefined}
              />
            )}
          </Paper>
        </Tabs.Panel>

        {/* Slot List */}
        <Tabs.Panel value="list" pt="sm">
          <Paper style={styles.card} p="sm">
            {loadingSlots ? (
              <Group justify="center" p="xl">
                <Loader variant="dots" />
              </Group>
            ) : (
              <ScrollArea h={500}>
                <Table striped highlightOnHover style={{ fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Time</th>
                      <th>Course</th>
                      <th>Type</th>
                      <th>Faculty</th>
                      <th>Room</th>
                      <th>Cohort</th>
                      <th>Locked</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((s) => (
                      <tr key={s.id}>
                        <td>{DAY_FULL[s.day - 1]}</td>
                        <td>
                          {s.start_time}–{s.end_time}
                        </td>
                        <td>
                          <Text size="xs" fw={600}>
                            {s.course_code}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {s.course_name}
                          </Text>
                        </td>
                        <td>
                          <Badge
                            size="xs"
                            color={
                              s.slot_type === "Lecture"
                                ? "blue"
                                : s.slot_type === "Tutorial"
                                  ? "green"
                                  : "violet"
                            }
                          >
                            {s.slot_type}
                          </Badge>
                        </td>
                        <td>
                          <Text size="xs">{s.faculty || "—"}</Text>
                        </td>
                        <td>
                          <Text size="xs" family="monospace">
                            {s.classroom}
                          </Text>
                        </td>
                        <td>
                          <Text size="xs" c="dimmed">
                            {s.batch} · {s.programme} · {s.branch}
                            {s.section ? ` · ${s.section}` : ""}
                          </Text>
                        </td>
                        <td>
                          {s.is_locked ? (
                            <ThemeIcon size="xs" color="yellow">
                              <IconLock size={10} />
                            </ThemeIcon>
                          ) : (
                            <Text size="xs" c="dimmed">
                              —
                            </Text>
                          )}
                        </td>
                        <td>
                          {selectedVersionIsEditable && (
                            <ActionIcon
                              size="xs"
                              variant="subtle"
                              onClick={() => setOverrideSlot(s)}
                            >
                              <IconEdit size={12} />
                            </ActionIcon>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ScrollArea>
            )}
          </Paper>
        </Tabs.Panel>

        {/* Room Heatmap */}
        <Tabs.Panel value="heatmap" pt="sm">
          <Paper style={styles.card} p="md">
            <RoomHeatmap versionId={selectedVersion} />
          </Paper>
        </Tabs.Panel>

        {/* Conflict Log */}
        <Tabs.Panel value="conflicts" pt="sm">
          <Paper style={styles.card} p="md">
            <ConflictLog versionId={selectedVersion} />
          </Paper>
        </Tabs.Panel>
      </Tabs>

      {/* ── Override Modal (WF-03) ── */}
      <OverrideModal
        slot={overrideSlot}
        opened={!!overrideSlot}
        onClose={() => setOverrideSlot(null)}
        onSuccess={() => {
          setOverrideSlot(null);
          fetchSlots();
        }}
      />
    </Box>
  );
}
