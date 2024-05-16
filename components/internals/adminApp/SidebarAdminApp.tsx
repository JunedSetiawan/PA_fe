"use client";

import { checkAccessFeature } from "@/utils/internal/sioma";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Cube, CaretLeft } from "phosphor-react";
import React, { useEffect } from "react";

function SidebarAdminApp() {
  const path = usePathname();
  const paths = path.split("/");

  useEffect(() => {
    /**
     * Add event showed dropdown child sidenav on click sidenav has child.
     */
    const sideNavHasChilds: any = document.getElementsByClassName(
      "sidebar-item-has-child"
    );
    for (const sideNavHasChild of sideNavHasChilds as HTMLElement[]) {
      sideNavHasChild
        .querySelector(".sidebar-link")
        ?.addEventListener("click", onClickSidenavHasChild);
    }

    return () => {
      /**
       * Remove event showed dropdown child sidenav on click sidenav has child.
       */
      for (const sideNavHasChild of sideNavHasChilds as HTMLElement[]) {
        sideNavHasChild
          .querySelector(".sidebar-link")
          ?.removeEventListener("click", onClickSidenavHasChild);
      }
    };
  }, []);

  /**
   * Render JSX
   */
  return (
    <>
      <aside className="sidebar">
        <div className="px-8 py-6 flex items-center gap-3">
          <div
            className="h-[3.75rem] bg-profile"
            style={{
              backgroundImage: `URL(/public/logo/logo-smkn-jenangan.png)`,
            }}
          />
          <div className="text-white/80">
            <div className="text-xl mt-[.15rem]">Tatib & Konseling</div>
            <div className="text-xs mt-1 font-light">SMKN 1 JENANGAN</div>
          </div>
        </div>
        <div>
          {checkAccessFeature([]) && (
            <div
              className={`sidebar-item ${
                [""].includes(paths?.[1] as any) ? "active" : ""
              }`}
            >
              <Link href={`/`} className={`sidebar-link`}>
                <div className="flex items-center gap-3 capitalize">
                  <House className="text-xl" />
                  <div>home</div>
                </div>
              </Link>
            </div>
          )}
          <div
            className={`sidebar-item sidebar-item-has-child ${
              ["sample"].includes(paths[1])
                ? "active sidebar-item-has-child-open"
                : ""
            }`}
          >
            <div className={`sidebar-link`}>
              <div className="flex items-center gap-3">
                <Cube className="text-xl" />
                <div>Sample</div>
              </div>
              <div className="ml-auto">
                <div className="sidebar-child-arrow">
                  <CaretLeft className="text-sm" />
                </div>
              </div>
            </div>
            <div className="sidebar-child">
              <Link
                href={`/sample/monofile`}
                className={`sidebar-link ${
                  ["monofile"].includes(paths[2]) ? "active" : ""
                }`}
              >
                <span className="text-xl">-</span>
                <div>Monofile</div>
              </Link>
              <Link
                href={`/sample/parsed-fetcher`}
                className={`sidebar-link ${
                  ["parsed-fetcher"].includes(paths[2]) ? "active" : ""
                }`}
              >
                <span className="text-xl">-</span>
                <div>Parsed Fetcher</div>
              </Link>
              <Link
                href={`/sample/parsed-view`}
                className={`sidebar-link ${
                  ["parsed-view"].includes(paths[2]) ? "active" : ""
                }`}
              >
                <span className="text-xl">-</span>
                <div>Parsed View</div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
      <div
        className="sidebar-overlay"
        onClick={() => {
          /**
           * Hide sidebar on click overlay.
           */
          const sidebarEl = document.body.classList;
          if (!sidebarEl.contains("sidebar-collapse"))
            sidebarEl.add("sidebar-collapse");
        }}
      />
    </>
  );
}

function onClickSidenavHasChild(e: Event) {
  e.preventDefault();
  const classList = (e.target as Element).closest(
    ".sidebar-item-has-child"
  )?.classList;
  if (classList?.contains("sidebar-item-has-child-open")) {
    classList?.remove("sidebar-item-has-child-open");
  } else {
    classList?.add("sidebar-item-has-child-open");
  }
}

export default SidebarAdminApp;
