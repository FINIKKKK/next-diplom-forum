import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useSelectors } from "@/hooks/useSelectors";
import Link from "next/link";
import React from "react";

import ss from "./Popup.module.scss";

interface PopupProps {
  type: string;
  isVisible: boolean;
  setIsVisible: any;
  onChange?: any;
  onRemove: any;
  userId?: number;
  questionId?: number;
  className?: string;
}

export const Popup: React.FC<PopupProps> = ({
  type,
  isVisible,
  setIsVisible,
  onChange,
  onRemove,
  userId,
  className,
  questionId,
}) => {
  const refPopup = React.useRef<HTMLDivElement>(null);
  const { data: userData } = useSelectors((state) => state.user);

  useOutsideClick(refPopup, setIsVisible);

  return (
    <div ref={refPopup} className={`${className} ${ss.popup}`}>
      <svg
        onClick={() => setIsVisible(!isVisible)}
        className={ss.options}
        width="20"
        height="20"
      >
        <use xlinkHref="../img/icons/icons.svg#options" />
      </svg>
      {isVisible && (
        <div className={`block ${ss.box}`}>
          {userData?.id !== userId ? (
            <>
              <div className={ss.item}>Пожаловаться</div>
            </>
          ) : (
            <>
              {type === "question" ? (
                <div onClick={onChange} className={ss.item}>
                  <Link href={`/create/${questionId}`}>Редактировать</Link>
                </div>
              ) : (
                <div onClick={onChange} className={ss.item}>
                  Редактировать
                </div>
              )}
              <div onClick={onRemove} className={ss.item}>
                Удалить
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
