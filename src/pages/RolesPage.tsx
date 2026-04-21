import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  PermCheckbox,
} from "@/components/ui";
import { MOCK_ROLES, ALL_PERMISSIONS } from "@/lib/mockData";
import type { Role, PermissionKey } from "@/types";

export default function RolesPage() {
  const [selected, setSelected] = useState<Role>(MOCK_ROLES[1]);
  const [perms, setPerms] = useState<PermissionKey[]>(
    MOCK_ROLES[1].permissions,
  );
  const [roleName, setRoleName] = useState(MOCK_ROLES[1].name);

  const selectRole = (role: Role) => {
    setSelected(role);
    setPerms([...role.permissions]);
    setRoleName(role.name);
  };

  const togglePerm = (p: PermissionKey) => {
    if (selected.isSystem) return;
    setPerms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-vs-black">
      <div className="grid grid-cols-2 gap-5">
        {/* Role list */}
        <div>
          <p className="font-head font-bold text-[15px] tracking-wide text-vs-text mb-3">
            Custom Roles
          </p>
          <Card>
            {MOCK_ROLES.map((role, i) => (
              <div
                key={role.id}
                onClick={() => selectRole(role)}
                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors hover:bg-white/2
                  ${i < MOCK_ROLES.length - 1 ? "border-b border-white/5" : ""}
                  ${selected.id === role.id ? "bg-white/3" : ""}`}
                style={{
                  borderLeft: `2px solid ${selected.id === role.id ? "#CCFF33" : "transparent"}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-head font-bold text-[13px]"
                  style={{
                    backgroundColor: role.color + "22",
                    border: `1px solid ${role.color}33`,
                    color: role.color,
                  }}
                >
                  {role.abbr}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-[13px] text-vs-text">
                    {role.name}
                  </p>
                  <p className="font-body text-[11px] text-vs-muted truncate">
                    {role.permissions.slice(0, 3).join(" · ")}
                    {role.permissions.length > 3 ? " ···" : ""}
                  </p>
                </div>
                {role.isSystem ? (
                  <Badge variant="system">System</Badge>
                ) : (
                  <span className="font-body text-[11px] text-vs-muted">
                    {role.memberCount} members
                  </span>
                )}
              </div>
            ))}
          </Card>
        </div>

        {/* Permission editor */}
        <div>
          <p className="font-head font-bold text-[15px] tracking-wide text-vs-text mb-3">
            Edit Role: {selected.name}
          </p>
          <Card>
            <CardBody className="p-4">
              <div className="mb-3">
                <label className="font-body font-semibold text-[11px] tracking-widest uppercase text-vs-muted block mb-1.5">
                  Role Name
                </label>
                <input
                  value={roleName}
                  onChange={(e) =>
                    !selected.isSystem && setRoleName(e.target.value)
                  }
                  disabled={selected.isSystem}
                  className="w-full bg-white/4 border border-vs-border rounded-lg px-3 py-2 text-[13px] font-body text-vs-text outline-none focus:border-vs-lime/40 disabled:opacity-60"
                />
              </div>

              <Divider label="Permissions" />

              <div className="grid grid-cols-2 gap-2">
                {ALL_PERMISSIONS.map((p) => (
                  <PermCheckbox
                    key={p}
                    permission={p}
                    checked={perms.includes(p as PermissionKey)}
                    disabled={selected.isSystem}
                    onToggle={() => togglePerm(p as PermissionKey)}
                  />
                ))}
              </div>

              {!selected.isSystem && (
                <div className="flex gap-2 mt-4">
                  <Button variant="primary" className="flex-1">
                    Save Role
                  </Button>
                  <Button variant="danger">Delete</Button>
                </div>
              )}
              {selected.isSystem && (
                <div
                  className="mt-4 px-3 py-2.5 rounded-lg border"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    borderColor: "rgba(245,158,11,0.2)",
                  }}
                >
                  <p className="font-body text-[12px] text-vs-amber">
                    ⚠ System roles cannot be modified.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
