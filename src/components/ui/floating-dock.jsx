import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";


export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }) => {
  const [showMore, setShowMore] = useState(false);

  const visibleItems = items.slice(0, 5);
  const moreItems = items.slice(5);

  const renderItem = (item) => {
    const isAction = typeof item.action === "function";
    const Wrapper = isAction ? "button" : "a";
    const props = isAction ? { onClick: item.action, type: "button" } : { href: item.href };

    return (
      <Wrapper
        key={item.title}
        {...props}
        className="flex flex-col items-center justify-center space-y-1 text-xs text-neutral-500 dark:text-neutral-300 hover:text-blue-500 transition-all"
      >
        <div className="h-6 w-6">{item.icon}</div>
      </Wrapper>
    );
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 py-2 px-4 md:hidden",
      className
    )}>
      {visibleItems.map(renderItem)}

      {moreItems.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-col items-center justify-center space-y-1 text-xs text-neutral-500 dark:text-neutral-300 hover:text-blue-500 transition-all"
          >
            <MoreHorizontal className="h-6 w-6" />
          </button>

          {showMore && (
            <div className="absolute bottom-12 right-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50 p-2 space-y-2">
              {moreItems.map((item) => {
                const isAction = typeof item.action === "function";
                const Wrapper = isAction ? "button" : "a";
                const props = isAction
                  ? { onClick: () => { item.action(); setShowMore(false); }, type: "button" }
                  : { href: item.href };

                return (
                  <Wrapper
                    key={item.title}
                    {...props}
                    className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-500"
                  >
                    <div className="h-5 w-5">{item.icon}</div>
                    <span>{item.title}</span>
                  </Wrapper>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};



// ─────────────────────────────────────────────────────────
// DESKTOP NAV WITH UNIQUE ANIMATION
// ─────────────────────────────────────────────────────────
const FloatingDockDesktop = ({ items, className }) => {
  return (
    <div
      className={cn(
        "hidden md:flex flex-col items-start w-60 gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 shadow",
        className
      )}
    >
      {items.map((item) => (
        <AnimatedDockItem key={item.title} {...item} />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// INDIVIDUAL ITEM WITH UNIQUE GLOW + TILT ANIMATION
// ─────────────────────────────────────────────────────────
const AnimatedDockItem = ({ title, icon, href, action }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const Wrapper = action ? "button" : "a";
  const wrapperProps = action
    ? { onClick: action, type: "button" }
    : { href };

  return (
    <Wrapper
      {...wrapperProps}
      className="w-full block text-left"
    >
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex items-center gap-4 rounded-lg px-4 py-2 w-full transition-all duration-300",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800"
        )}
        animate={{
          rotate: hovered ? -2 : 0,
          scale: hovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="h-8 w-8 relative flex items-center justify-center"
          animate={{
            scale: hovered ? 1.25 : 1,
            rotate: hovered ? 8 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-md z-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative z-10 text-neutral-800 dark:text-white">{icon}</div>
        </motion.div>

        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 z-10">
          {title}
        </span>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white shadow-md"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Wrapper>
  );
};

