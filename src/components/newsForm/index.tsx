import { useEffect } from "react";
import { Button, Flex, Form, Input, InputNumber } from "antd";
import { INewsFormProps } from "../../types/news";
import { validateImageUrl } from "../../utils/validatImage";
import "./style.scss";

const NewsForm: React.FC<INewsFormProps> = ({ closedModal, editedArticle }) => {
  const form = Form.useFormInstance();

  useEffect(() => {
    if (editedArticle) {
      form.setFieldsValue({
        title: editedArticle.title,
        description: editedArticle.title,
        image: editedArticle.image,
        fibonacciNumber: editedArticle.fibonacciNumber,
      });
    }
  }, [editedArticle, form]);

  return (
    <Flex vertical>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          { required: true, message: "The title field is required." },
          {
            min: 3,
            message: "The title field must contain at least 3 characters.",
          },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "The description field is required." },
          {
            min: 5,
            message:
              "The description field must contain at least 10 characters.",
          },
        ]}
      >
        <Input placeholder="Description" />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image URL"
        rules={[
          { required: true, message: "This field is required." },
          { validator: validateImageUrl },
        ]}
      >
        <Input placeholder="Add image URL" />
      </Form.Item>
      <Form.Item name="fibonacciNumber" label="Fibonacci number">
        <InputNumber
          placeholder="Add number"
          min={1}
          className="input-number"
        />
      </Form.Item>

      <Flex justify="end" gap={16}>
        <Button onClick={closedModal}>Cancel</Button>
        <Button htmlType="submit" type="primary">
          {editedArticle ? "Edit news" : "Add news"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default NewsForm;
