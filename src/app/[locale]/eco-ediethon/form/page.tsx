"use client";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Typography,
  Divider,
  Select,
  notification,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { FetchInstance } from "@/api/FetchInstance";
import { IResponse } from "@/types";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
const { Title, Paragraph } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

interface EcoFormValues {
  full_name: string;
  age: number;
  region: string;
  region_id: number;
  phone: string;
  email: string;
  project_name: string;
  project_brief: string;
  project_goal: string;
  project_problem: string;
  implementation_plan: string;
  team_info?: string;
  why_chosen: string;
}

interface Region {
  id: number;
  name_uz: string;
}

interface ScienceIdResponse {
  id: number;
  gd_display: string;
  user_type_display: string;
  science_id: string;
  phone_number: string;
  degree: string;
  pin: string;
  first_name: string;
  sur_name: string;
  mid_name: string;
  full_name: string;
  birth_date: string;
  birth_place: string;
  birth_country: string;
  ctzn: string;
  gd: number;
  mob_phone_no: string | null;
  email: string;
  natn: string;
  per_adr: string;
  pport_expr_date: string;
  pport_issue_date: string;
  pport_issue_place: string;
  pport_no: string;
  tin: string | null;
  user_type: string;
  foreign_user: boolean;
  valid: boolean;
  photo: string;
  live_status: boolean;
  profile_image: string | null;
  is_active: boolean;
  last_job_updated_date: string;
  region: number;
}

const EcoEdiethonForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const [showMainForm, setShowMainForm] = useState(false);
  const [regions, setRegions] = useState<Region[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("eco_form");

  const {push} = useRouter()

  // Regionlarni yuklash
  const fetchRegions = useCallback(async () => {
    try {
      setRegionsLoading(true);
      const response = await FetchInstance<IResponse<Region[]>>(
        "/api/regions/all"
      );
      if (response?.data) {
        setRegions(response.data);
      }
    } catch (error) {
      console.error("Regionlarni yuklashda xatolik:", error);
      message.error(t("regions_error"));
    } finally {
      setRegionsLoading(false);
    }
  }, [t]);

  // Komponent yuklanganda regionlarni olish
  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  const uploadProps = useMemo(
    () => ({
      name: "file",
      multiple: false,
      fileList,
      maxCount: 1,
      accept: ".pdf,.ppt,.pptx",
      beforeUpload: (file: File) => {
        const isAllowed = [
          "application/pdf",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ].includes(file.type);
        if (!isAllowed) {
          message.error(t("file_type_error"));
          return Upload.LIST_IGNORE;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          message.error(t("file_size_error"));
          return Upload.LIST_IGNORE;
        }
        return false; // auto upload emas
      },
      onChange: (info: UploadChangeParam<UploadFile>) => {
        setFileList(info.fileList.slice(-1));
      },
      onRemove: () => {
        setFileList([]);
      },
    }),
    [fileList, t]
  );

  const onFinish = useCallback(
    async (values: EcoFormValues) => {
      if (isSubmitting) return; // Prevent multiple submissions
      
      try {
        setIsSubmitting(true);
        
        // Telefonni +998 prefiks bilan birga jamlaymiz
        const phone = `+998 ${values.phone}`.trim();

        // FormData tayyorlash (serverga yuborishga tayyor)
        const formData = new FormData();
        formData.append("full_name", values.full_name);
        formData.append("age", String(values.age));
        formData.append("region_id", String(values.region_id));
        formData.append("phone", phone);
        formData.append("email", values.email);
        formData.append("project_name", values.project_name);
        formData.append("project_brief", values.project_brief);
        formData.append("project_goal", values.project_goal);
        formData.append("project_problem", values.project_problem);
        formData.append("implementation_plan", values.implementation_plan);
        formData.append("team_info", values.team_info || "");
        formData.append("why_chosen", values.why_chosen);
        if (!fileList.length || !fileList[0]?.originFileObj) {
          message.error(t("file_required"));
          return;
        }
        if (fileList[0]?.originFileObj) {
          formData.append("presentation", fileList[0].originFileObj);
        }

        // TODO: haqiqiy endpointga yuborish
        const response = await FetchInstance<IResponse<{ message: string }>>(
          "/api/eco-ideathon",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response?.status == 201) {
          console.log(response);
          notification.success({
            message: t("submit_success_title"),
            description: t("submit_success"),
          });
          form.resetFields();
          setFileList([]);
          setIsAutoFilled(false);
          push("/profile")
        }
      } catch (e) {
        message.error(t("submit_error"));
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
    },
    [fileList, form, push, t, isSubmitting]
  );

  const searchByScienceId = async (scienceId: { science_id: string }) => {
    try {
      const response = await FetchInstance<IResponse<ScienceIdResponse>>(
        `/api/scienceid/${scienceId.science_id}`
      );

      if (response?.data) {
        const data = response.data;
        // Yoshni birth_date dan hisoblash
        const calculateAge = (birthDate: string) => {
          const birth = new Date(birthDate);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
          ) {
            age--;
          }
          return age;
        };
        // Telefon raqamini formatlashtirish (+998 ni olib tashlash)
        const formatPhone = (phone: string) => {
          return phone.replace(/^\+998\s*/, "").replace(/\D/g, "");
        };
        // Formani ma'lumotlar bilan to'ldirish
        form.setFieldsValue({
          full_name: data.full_name,
          age: calculateAge(data.birth_date),
          // region: data.per_adr || "", // Yashash manzili (eski field)
          // region_id: data.region || null, // API dan kelgan region_id
          phone: formatPhone(data.phone_number || data.mob_phone_no || ""),
          email: data.email,
        });

        message.success(`${data.full_name} ${t("success_message")}`);
        setIsAutoFilled(true); // Ma'lumotlar yuklangani belgilash
        setShowMainForm(true); // Asosiy formani ko'rsatish
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      message.error(t("not_found_message"));
    }
  };

  const resetAutoFill = () => {
    form.resetFields([
      "full_name",
      "age",
      "region",
      "region_id",
      "phone",
      "email",
    ]);
    setIsAutoFilled(false);
    setShowMainForm(false);
    message.info(t("clear_success"));
  };

  return (
    <section id="eco-ediethon" className="section bg-transparent mt-8 min-h-[80vh]">
      <div className="container max-w-4xl">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-lg bg-white dark:bg-[#0b1220]">
          <Title level={3} className="!mb-1 !text-gray-900 dark:!text-white">
            {t("title")}
          </Title>
          <Paragraph className="!text-gray-600 dark:!text-gray-300 !mb-6">
            {t("description")}
          </Paragraph>
          <Form
            layout="vertical"
            className="mb-4"
            onFinish={searchByScienceId}
            size="large"
          >
            <Form.Item
              label={t("science_id_search")}
              className="mb-6"
              layout="vertical"
              name="science_id"
              rules={[
                {
                  pattern: /^[A-Z]{3}-\d{4}-\d{4}$/,
                  message: t("validation.science_id_format"),
                },
              ]}
            >
              <Input.Search
                placeholder={t("science_id_placeholder")}
                allowClear
                className="!w-[calc(100%-80px)]"
                style={{ textTransform: "uppercase" }}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
                enterButton={
                  <Button type="primary" htmlType="submit">
                    {t("search_button")}
                  </Button>
                }
              />
              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                <span className="inline-flex items-center">
                  ℹ️ {t("science_id_info")}
                </span>
              </div>
            </Form.Item>
            {isAutoFilled && (
              <div className="mb-4">
                <Button
                  type="default"
                  danger
                  onClick={resetAutoFill}
                  size="small"
                >
                  {t("clear_data")}
                </Button>
              </div>
            )}
          </Form>

          {/* Manual form tugmasi - agar Science ID ishlatilmasa */}
            {/* {!showMainForm && (
              <div className="text-center mb-6">
                <Button 
                  type="default" 
                  onClick={() => setShowMainForm(true)} 
                  size="large"
                >
                  Science ID&apos;siz davom etish
                </Button>
              </div>
            )} */}

          {/* Asosiy forma - faqat showMainForm true bo'lganda */}
          {showMainForm && (
            <>
              <Divider className="!my-4" />

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark
                size="large"
              >
            {/* 1. FIO */}
            <Form.Item
              label={t("labels.full_name")}
              name="full_name"
              rules={[{ required: true, message: t("validation.full_name_required") }]}
            >
              <Input
                placeholder={t("placeholders.full_name")}
                allowClear
                disabled={isAutoFilled}
              />
            </Form.Item>

            {/* 2. Age */}
            <Form.Item
              label={t("labels.age")}
              name="age"
              rules={[{ required: true, message: t("validation.age_required") }]}
            >
              <InputNumber
                min={14}
                max={100}
                className="w-full"
                placeholder={t("placeholders.age")}
                disabled={isAutoFilled}
              />
            </Form.Item>

            {/* 3. Region / City */}
            <Form.Item
              label={t("labels.region")}
              name="region_id"
              rules={[{ required: true, message: t("validation.region_required") }]}
            >
              <Select
                placeholder={t("placeholders.region")}
                allowClear
                loading={regionsLoading}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={regions.map((region) => ({
                  value: region.id,
                  label: region.name_uz,
                }))}
                className="border"
              />
            </Form.Item>

            {/* 4. Phone */}
            <Form.Item
              label={t("labels.phone")}
              required
            >
              <Input.Group compact>
                <Input disabled value={"+998"} className="!w-24" />
                <Form.Item
                  name="phone"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: t("validation.phone_required"),
                    },
                  ]}
                >
                  <Input
                    className="!w-[calc(100%-6rem)]"
                    placeholder={t("placeholders.phone")}
                    allowClear
                    disabled={isAutoFilled}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            {/* 5. Email */}
            <Form.Item
              label={t("labels.email")}
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: t("validation.email_required"),
                },
              ]}
            >
              <Input
                placeholder={t("placeholders.email")}
                allowClear
                disabled={isAutoFilled}
              />
            </Form.Item>

            {/* 6. Project name */}
            <Form.Item
              label={t("labels.project_name")}
              name="project_name"
              rules={[{ required: true, message: t("validation.project_name_required") }]}
            >
              <Input placeholder={t("placeholders.project_name")} allowClear />
            </Form.Item>

            {/* 7. Brief idea */}
            <Form.Item
              label={t("labels.project_brief")}
              name="project_brief"
              rules={[{ required: true, message: t("validation.project_brief_required") }]}
            >
              <TextArea
                rows={4}
                maxLength={2000}
                showCount
                placeholder={t("placeholders.project_brief")}
              />
            </Form.Item>

            {/* 8. Goal */}
            <Form.Item
              label={t("labels.project_goal")}
              name="project_goal"
              rules={[{ required: true, message: t("validation.project_goal_required") }]}
            >
              <TextArea
                rows={3}
                maxLength={2000}
                showCount
                placeholder={t("placeholders.project_goal")}
              />
            </Form.Item>

            {/* 9. Problem */}
            <Form.Item
              label={t("labels.project_problem")}
              name="project_problem"
              rules={[{ required: true, message: t("validation.project_problem_required") }]}
            >
              <TextArea
                rows={4}
                maxLength={3000}
                showCount
                placeholder={t("placeholders.project_problem")}
              />
            </Form.Item>

            {/* 10. Plan */}
            <Form.Item
              label={t("labels.implementation_plan")}
              name="implementation_plan"
              rules={[{ required: true, message: t("validation.implementation_plan_required") }]}
            >
              <TextArea
                rows={4}
                maxLength={3000}
                showCount
                placeholder={t("placeholders.implementation_plan")}
              />
            </Form.Item>

            {/* 11. Team */}
            <Form.Item
              label={t("labels.team_info")}
              name="team_info"
            >
              <TextArea
                rows={3}
                maxLength={3000}
                showCount
                placeholder={t("placeholders.team_info")}
              />
            </Form.Item>

            {/* 12. Why chosen */}
            <Form.Item
              label={t("labels.why_chosen")}
              name="why_chosen"
              rules={[{ required: true, message: t("validation.why_chosen_required") }]}
            >
              <TextArea
                rows={3}
                maxLength={2000}
                showCount
                placeholder={t("placeholders.why_chosen")}
              />
            </Form.Item>

            <Divider className="!my-4" />

            {/* 13. Presentation file */}
            <Form.Item
              label={t("labels.presentation_file")}
              required
            >
              <Dragger {...uploadProps} className="!p-4">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  {t("upload.presentation_text")}
                </p>
                <p className="ant-upload-hint">
                  {t("upload.presentation_hint")}
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item className="!mt-6">
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
              </Button>
            </Form.Item>
          </Form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EcoEdiethonForm;
