import { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface ITextarea {
  name: string;
  control: Control<any, any>;
  errors: FieldErrors;
  placeholder: string;
  isValid: boolean;
  className?: string;
}

const Textarea = (data: ITextarea) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Controller
        control={data.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <div className="relative">
            <div className='flex justify-center items-center relative'>
            <textarea
                placeholder={data.placeholder}
                onChange={onChange}
                maxLength={30}
                onBlur={onBlur}
                value={value || ''}
                className={`${
                    data.errors[data.name]?.message
                    ? 'border border-red-500'
                    : data.isValid
                } ${data.className ?? "w-96 border border-gray-700 rounded-md p-2 mb-2"}`}
            />
            </div>
            {data.errors[data.name]?.message && (
              <div>
                <span className="text-xs text-red-500">
                  {data.errors[data.name] &&
                    data.errors[data.name]?.message &&
                    data.errors[data.name]?.message?.toString()}
                </span>
              </div>
            )}
          </div>
        )}
        name={data.name}
      />
    </div>
  );
};

export default Textarea;