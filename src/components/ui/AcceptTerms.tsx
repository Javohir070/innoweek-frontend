import { Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

const AcceptTerms = () => {
  const t = useTranslations("accept_terms");

  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <span
        className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#0085d4] cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {t("accept_terms")}
      </span>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        cancelText={t("close")}
        okText={t("accept")}
        okButtonProps={{style: { display: "none" }}}
        className="!w-[94%] md:!w-2/3 lg:!w-2/3 xl:w-1/3 2xl:w-1/4"
        // width={"100vw"}
      >
        <div className="p-2 md:!p-4">
          <h2 className="!text-xl !font-semibold mb-2 !text-[#0085d4] text-center">
            {t("terms_conditions")}
          </h2>
          <p>{t("terms_conditions_description")}</p>
          {/* blog_1 */}
          <div>
            <h2 className="!text-xl !font-semibold mb-2 !text-[#0085d4] text-center">
              {t("blog_1")}
            </h2>
            <ul className="list-decimal">
              <li>{t("term_1")}</li>
              <li>{t("term_2")}</li>
              <li>{t("term_3")}</li>
              <li>{t("term_4")}</li>
            </ul>
          </div>
          <div>
            <h2 className="!text-xl !font-semibold mb-2 !text-[#0085d4] text-center w-2/3 mx-auto">
              {t("blog_2")}
            </h2>
            <ul className="list-decimal">
              <li>{t("term_5")}</li>
              <li>{t("term_6")}</li>
            </ul>
          </div>
          <div>
            <h2 className="!text-xl !font-semibold mb-2 !text-[#0085d4] text-center w-2/3 mx-auto">
              {t("blog_3")}
            </h2>
            <ul className="list-decimal">
              <li>{t("term_7")}</li>
            </ul>
          </div>
          <div>
            <h2 className="!text-xl !font-semibold mb-2 !text-[#0085d4] text-center w-2/3 mx-auto">
              {t("blog_4")}
            </h2>
            <ul className="list-decimal">
              <li>{t("term_8")}</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AcceptTerms;
