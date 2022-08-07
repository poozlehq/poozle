import { Block } from '../../types/block';
import { UseFormReturnType } from '@mantine/form';

import styles from './input_wrapper.module.scss';
import SelectWithFetch from '../../ui/select/select_with_fetch';
import Input from '../../ui/input/input';

export type Props = {
  type: string;
  label: string;
  text?: string;
  element: {
    action_id: string;
    placeholder?: string;
    type: string;
    fetch_data_id?: string;
  };
  data?: any[];
  key?: string;
  blocks?: Block[];
  inputProps: any;
};

function InputWrapper(props: Props) {
  const { element, label, data, type, key, blocks, inputProps } = props;
  let Component: React.ReactElement = <></>;
  console.log(inputProps);

  if (type === 'input') {
    // if (element.type == 'select') {
    //   Component = (
    //     <SelectWithFetch
    //       label={label}
    //       name={element.action_id}
    //       placeholder={element.placeholder}
    //       fetchDataId={element.fetch_data_id}
    //       required
    //       data={data}
    //     />
    //   );
    // }

    if (element.type == 'plain_text_input') {
      Component = (
        <Input label={label} name={element.action_id} placeholder={element.placeholder} required />
      );
    }
  }

  if (type === 'section') {
    Component = (
      <>
        {blocks &&
          blocks.map((block: Block) => (
            <div className={styles.input}>
              <InputWrapper
                label={block.label}
                element={block.element}
                type={block.type}
                key={block.label}
                inputProps={{}}
                {...block}
              />
            </div>
          ))}
      </>
    );
  }

  return <div key={key}>{Component}</div>;
}

export default InputWrapper;
