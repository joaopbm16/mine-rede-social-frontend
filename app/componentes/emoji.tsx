interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
  }
  
  const EmojiPicker = (props: EmojiPickerProps) => {
    const emojiList = [
      "😀",
      "😂",
      "😍",
      "👍",
      "🔥",
      "🎉",
      "❤️",
      "😎",
      "😢",
      "🙏",
    ];
  
    return (
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "8px",
          display: "grid", 
          gridTemplateColumns: "repeat(5, 1fr)", 
          gap: "6px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          zIndex: 100,
        }}
      >
        {emojiList.map((emoji) => (
          <button
            key={emoji}
            onClick={() => props.onSelect(emoji)}
            style={{
              fontSize: "20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  };
  
  export default EmojiPicker;