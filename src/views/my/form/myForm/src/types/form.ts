import { CheckboxProps, InputProps, FormProps, FormItemProps } from 'ant-design-vue';

type MyFormItemRenderNameType = 'Input' | 'Checkbox';

type MyFormItemRenderAttrs<T extends MyFormItemRenderNameType> = T extends 'Input'
  ? InputProps
  : T extends 'Checkbox'
  ? CheckboxProps
  : {};

export interface MyFormItemRenderProps<
  T extends MyFormItemRenderNameType = MyFormItemRenderNameType,
> {
  component: T;
  attrs?: MyFormItemRenderAttrs<T>;
  events?: {
    [key: string]: (...args: any[]) => any;
  };
}

export interface MyFormItemProps {
  field: string;
  attrs?: FormItemProps;
  render?: MyFormItemRenderProps;
}

export interface MyFormProps {
  attrs?: FormProps;
  events?: {
    [key: string]: (...args: any[]) => any;
  };
  items: MyFormItemProps[];
}
