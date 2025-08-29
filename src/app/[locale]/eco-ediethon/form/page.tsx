"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Form, Input, InputNumber, Upload, Button, message, Typography, Divider } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { InboxOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

interface EcoFormValues {
  full_name: string;
  age: number;
  region: string;
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

const EcoEdiethonForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
          message.error("Faqat PDF yoki PPT/PPTX fayllar qabul qilinadi");
          return Upload.LIST_IGNORE;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          message.error("Fayl hajmi 10MB dan kichik bo'lishi kerak");
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
    [fileList]
  );

  const onFinish = useCallback(async (values: EcoFormValues) => {
    try {
      // Telefonni +998 prefiks bilan birga jamlaymiz
      const phone = `+998 ${values.phone}`.trim();

      // FormData tayyorlash (serverga yuborishga tayyor)
      const formData = new FormData();
      formData.append("full_name", values.full_name);
      formData.append("age", String(values.age));
      formData.append("region", values.region);
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
        message.error("Fayl yuklash majburiy");
        return;
      }
      if (fileList[0]?.originFileObj) {
        formData.append("presentation", fileList[0].originFileObj);
      }

      // TODO: haqiqiy endpointga yuborish
      // fetch("/api/eco-ediethon/apply", { method: "POST", body: formData });

      message.success("Arizangiz muvaffaqiyatli yuborildi!");
      form.resetFields();
      setFileList([]);
    } catch (e) {
      message.error("Ariza yuborishda xatolik yuz berdi");
      console.error(e);
    }
  }, [fileList, form]);

  return (
    <section id="eco-ediethon" className="section bg-transparent mt-8">
      <div className="container max-w-4xl">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-lg bg-white dark:bg-[#0b1220]">
          <Title level={3} className="!mb-1 !text-gray-900 dark:!text-white">
            Eco-Edithon ariza formasi
          </Title>
          <Paragraph className="!text-gray-600 dark:!text-gray-300 !mb-6">
            Iltimos, quyidagi maydonlarni to&apos;ldiring. Yulduzcha (*) bilan belgilangan maydonlar majburiy.
          </Paragraph>

          <Form form={form} layout="vertical" onFinish={onFinish} requiredMark>
            {/* 1. FIO */}
            <Form.Item
              label={"1. Фамилия, исм, шарифингиз / Фамилия, имя, отчество"}
              name="full_name"
              rules={[{ required: true, message: "FIO majburiy" }]}
            >
              <Input placeholder="Ivanov Ivan Ivanovich / Ivanov Ivan" allowClear />
            </Form.Item>

            {/* 2. Age */}
            <Form.Item
              label={"2. Ёшингиз / Ваш возраст"}
              name="age"
              rules={[{ required: true, message: "Yosh majburiy" }]}
            >
              <InputNumber min={14} max={100} className="w-full" placeholder="18" />
            </Form.Item>

            {/* 3. Region / City */}
            <Form.Item
              label={"3. Худуд / шахар / Регион / город"}
              name="region"
              rules={[{ required: true, message: "Hudud / shahar majburiy" }]}
            >
              <Input placeholder="Toshkent / Namangan / ..." allowClear />
            </Form.Item>

            {/* 4. Phone */}
            <Form.Item
              label={"4. Телефон ракамингиз (+998) / Номер телефона (+998)"}
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
                      message: "Telefon raqam majburiy",
                    },
                    {
                      pattern: /^\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
                      message: "Raqam formati: 90 123 45 67",
                    },
                  ]}
                >
                  <Input className="!w-[calc(100%-6rem)]" placeholder="90 123 45 67" allowClear />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            {/* 5. Email */}
            <Form.Item
              label={"5. Эмаил манзилингиз / Адрес электронной почты"}
              name="email"
              rules={[{ required: true, type: "email", message: "Email noto&apos;g&apos;ri" }]}
            >
              <Input placeholder="example@mail.com" allowClear />
            </Form.Item>

            {/* 6. Project name */}
            <Form.Item
              label={"6. Лойихангиз номи / Название проекта"}
              name="project_name"
              rules={[{ required: true, message: "Loyiha nomi majburiy" }]}
            >
              <Input placeholder="Eco-Waste Management" allowClear />
            </Form.Item>

            {/* 7. Brief idea */}
            <Form.Item
              label={"7. Лойиха тавсифи (асосий гоя) / Краткое описание проекта (основная идея)"}
              name="project_brief"
              rules={[{ required: true, message: "Qisqa tavsif majburiy" }]}
            >
              <TextArea rows={4} maxLength={2000} showCount placeholder="Loyiha g&apos;oyasi haqida qisqacha..." />
            </Form.Item>

            {/* 8. Goal */}
            <Form.Item
              label={"8. Лойиханинг максади / Цель проекта"}
              name="project_goal"
              rules={[{ required: true, message: "Maqsad majburiy" }]}
            >
              <TextArea rows={3} maxLength={2000} showCount placeholder="Loyihaning aniq maqsadi..." />
            </Form.Item>

            {/* 9. Problem */}
            <Form.Item
              label={"9. Долзарблик ва ечадиган муаммо / Актуальность и проблема, которую решает проект"}
              name="project_problem"
              rules={[{ required: true, message: "Muammo tavsifi majburiy" }]}
            >
              <TextArea rows={4} maxLength={3000} showCount placeholder="Qaysi muammoni hal qiladi?" />
            </Form.Item>

            {/* 10. Plan */}
            <Form.Item
              label={"10. Амалга ошириш режаси / План реализации"}
              name="implementation_plan"
              rules={[{ required: true, message: "Reja majburiy" }]}
            >
              <TextArea rows={4} maxLength={3000} showCount placeholder="Bosqichma-bosqich reja..." />
            </Form.Item>

            {/* 11. Team */}
            <Form.Item
              label={"11. Жамоа таркиби ва тажрибаси (агар жамоа булса) / Состав команды и опыт (если есть команда)"}
              name="team_info"
            >
              <TextArea rows={3} maxLength={3000} showCount placeholder="Jamoa a&apos;zolari va tajribasi..." />
            </Form.Item>

            {/* 12. Why chosen */}
            <Form.Item
              label={"12. Нега айнан сизнинг лойихангиз танланиши керак? / Почему именно ваш проект должен быть выбран?"}
              name="why_chosen"
              rules={[{ required: true, message: "Ushbu maydon majburiy" }]}
            >
              <TextArea rows={3} maxLength={2000} showCount placeholder="Qisqa va asosli javob..." />
            </Form.Item>

            <Divider className="!my-4" />

            {/* 13. Presentation file */}
            <Form.Item
              label={"13. Такдимот файли (факат ПДФ ёки ППТ, инглиз тилида) / Файл презентации (только ПДФ или ППТ, на английском языке)"}
              required
            >
              <Dragger {...uploadProps} className="!p-4">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">PDF yoki PPT/PPTX faylini bu yerga tashlang yoki tanlang</p>
                <p className="ant-upload-hint">Maks. 10MB. Auto-upload yo&apos;q, yuborishda birga jo&apos;natiladi.</p>
              </Dragger>
            </Form.Item>

            <Form.Item className="!mt-6">
              <Button type="primary" htmlType="submit" size="large">
                Yuborish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default EcoEdiethonForm;
